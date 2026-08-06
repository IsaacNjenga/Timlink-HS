import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { InventoryService } from "./inventory.service";
import { CreateInventoryDTO, UpdateInventoryDTO } from "./inventory.types";
import { createLog } from "../Logs";

const getInventoryIdParam = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new BadRequestError("Inventory ID is required!");
  }

  return Array.isArray(id) ? id[0] : id;
};

//to-do: make the code
export const CreateInventory = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const inventoryData = await InventoryService.createInventory(
      req.body as CreateInventoryDTO,
      req.user.role,
    );

    if (inventoryData) {
      await createLog({
        type: "inventory",
        refId: inventoryData._id.toString(),
        action: "created",
        title: "New Inventory item created",
        description: `Inventory: ${inventoryData?.equipmentName} category: ${inventoryData?.category} was created`,
        refModel: "inventory",
        actor: req.user?._id,
      });
    }

    res.status(201).json({
      success: true,
      data: inventoryData,
      message: "Inventory item has been created successfully",
    });
  },
);

export const FetchAllInventory = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const inventoryData = await InventoryService.fetchInventories(req);

    if (inventoryData && req.user?._id) {
      await createLog({
        type: "inventory",
        refId: req.user._id.toString(),
        action: "fetched",
        title: "All Inventory fetched",
        description: `Inventory list was fetched`,
        refModel: "inventory",
        actor: req.user?._id,
      });
    }

    res.status(200).json({
      success: true,
      data: inventoryData,
      message: "All Inventory fetched successfully",
    });
  },
);

export const FetchInventoryById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getInventoryIdParam(req.params.id);

    const inventory = await InventoryService.fetchInventoryById(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "inventory",
      refId: id,
      action: "received",
      title: "Inventory item retrieved",
      description: `Fetched Inventory item: ${id}`,
      refModel: "inventory",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: inventory,
      message: "Inventory item retrieved successfully",
    });
  },
);

export const UpdateInventory = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getInventoryIdParam(req.params.id);

    const inventory = await InventoryService.updateInventory(
      id,
      req.body as UpdateInventoryDTO,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "inventory",
      refId: id,
      action: "updated",
      title: "Inventory item updated",
      description: `Updated Inventory item: ${id}`,
      refModel: "inventory",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: inventory,
      message: "Inventory item updated successfully",
    });
  },
);

export const DeleteInventory = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getInventoryIdParam(req.params.id);

    await InventoryService.deleteInventory(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "inventory",
      refId: id,
      action: "deleted",
      title: "Inventory item deleted",
      description: `Deleted Inventory item: ${id}`,
      refModel: "inventory",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });
  },
);
