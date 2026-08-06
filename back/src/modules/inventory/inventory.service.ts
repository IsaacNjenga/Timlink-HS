import mongoose from "mongoose";
import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { InventoryModel } from "./inventory.model";
import {
  CreateInventoryDTO,
  UpdateInventoryDTO,
  Inventory,
  InventoryListResponse,
} from "./inventory.types";
import { type Request } from "express";

const inventoryCache = new NodeCache({ stdTTL: 300 });

const invalidateInventoryCache = (): void => {
  inventoryCache.flushAll();
};

const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);

const assertInventoryId = (inventoryId: string) => {
  if (!inventoryId) {
    throw new BadRequestError("Inventory ID is required");
  }
};

const toInventory = (inventory: unknown): Inventory => inventory as Inventory;

const sanitizeCreateData = (
  data: CreateInventoryDTO,
  requesterRole?: string,
): Partial<CreateInventoryDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = { ...data } as Record<string, unknown>;

  return createData as Partial<CreateInventoryDTO>;
};

const sanitizeUpdateData = (
  data: UpdateInventoryDTO,
  requesterRole?: string,
): Partial<UpdateInventoryDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Update data is required");
  }

  const updateData = { ...data } as Record<string, unknown>;
  const restrictedFields = Object.keys(updateData).filter((field) => {
    if (BLOCKED_UPDATE_FIELDS.has(field)) {
      return true;
    }

    return requesterRole !== "SUPER_ADMIN" && ADMIN_ONLY_FIELDS.has(field);
  });

  if (restrictedFields.length > 0) {
    throw new BadRequestError(
      `You cannot update these fields: ${restrictedFields.join(", ")}`,
    );
  }

  return updateData as Partial<UpdateInventoryDTO>;
};

export class InventoryService {
  static async createInventory(
    data: CreateInventoryDTO,
    // requesterId: string,
    requesterRole: string,
  ): Promise<Inventory> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new InventoryModel(createData);

    await result.save();

    const savedInventory = await InventoryModel.findById(result._id).lean();

    invalidateInventoryCache();
    return toInventory(savedInventory ?? result);
  }

  static async fetchInventories(req: Request): Promise<InventoryListResponse> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `Inventory_page_${page}_limit_${limit}`;
    const cachedData = inventoryCache.get<InventoryListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [inventories, totalInventories] = (await Promise.all([
      InventoryModel.find()
        .skip(skip)
        .limit(limit)
        .lean()
        .sort({ createdAt: -1 }),
      InventoryModel.countDocuments(),
    ])) as unknown as [Inventory[], number];

    if (!inventories) {
      throw new BadRequestError("Inventory not found!");
    }

    const responseData = {
      inventory: inventories,
      totalInventory: totalInventories,
      currentPage: page,
      totalPages: Math.ceil(totalInventories / limit),
    };

    //cache response
    inventoryCache.set(cacheKey, responseData);

    // return Inventory.map(toInventory);
    return responseData;
  }

  static async fetchInventoryById(
    inventoryId: string,
    requesterId: string,
    requesterRole: string,
  ): Promise<Inventory> {
    assertInventoryId(inventoryId);

    const inventory = await InventoryModel.findById(inventoryId).lean();

    if (!inventory) {
      throw new BadRequestError("Inventory not found!");
    }
    return toInventory(inventory);
  }

  static async updateInventory(
    inventoryId: string,
    data: UpdateInventoryDTO,
    requesterID: string,
    requesterRole: string,
  ): Promise<Inventory> {
    assertInventoryId(inventoryId);

    const updateData = sanitizeUpdateData(data, requesterRole);
    const inventory = await InventoryModel.findByIdAndUpdate(
      inventoryId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!inventory) {
      throw new BadRequestError("Inventory not found!");
    }

    invalidateInventoryCache();
    return toInventory(inventory);
  }

  static async deleteInventory(
    inventoryId: string,
    requesterId: string,
    requesterRole?: string,
  ): Promise<Inventory> {
    assertInventoryId(inventoryId);

    const inventory =
      await InventoryModel.findByIdAndDelete(inventoryId).lean();

    if (!inventory) {
      throw new BadRequestError("Inventory not found!");
    }

    invalidateInventoryCache();
    return toInventory(inventory);
  }
}
