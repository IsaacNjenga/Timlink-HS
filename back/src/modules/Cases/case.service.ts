import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { type Request } from "express";
import { CaseModel } from "./case.model";
import {
  CreateCaseDTO,
  CaseListResponse,
  Case,
  UpdateCaseDTO,
} from "./case.types";

const caseCache = new NodeCache({ stdTTL: 300 });

const invalidateCaseCache = (): void => {
  caseCache.flushAll();
};

const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);

const assertCaseId = (caseId: string) => {
  if (!caseId) {
    throw new BadRequestError("Case ID is required");
  }
};

const toCase = (caseData: unknown): Case => caseData as Case;

const sanitizeCreateData = (
  data: CreateCaseDTO,
  requesterRole?: string,
): Partial<CreateCaseDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = { ...data } as Record<string, unknown>;

  return createData as Partial<CreateCaseDTO>;
};

const sanitizeUpdateData = (
  data: UpdateCaseDTO,
  requesterRole?: string,
): Partial<UpdateCaseDTO> => {
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

  return updateData as Partial<UpdateCaseDTO>;
};

export class CaseService {
  static async createCase(
    data: CreateCaseDTO,
    // requesterId: string,
    requesterRole: string,
  ): Promise<Case> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new CaseModel(createData);

    await result.save();

    invalidateCaseCache();
    return toCase(result);
  }

  static async fetchCases(req: Request): Promise<CaseListResponse> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `case_page_${page}_limit_${limit}`;
    const cachedData = caseCache.get<CaseListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [cases, totalCases] = (await Promise.all([
      CaseModel.find().skip(skip).limit(limit).lean().sort({ createdAt: -1 }),
      CaseModel.countDocuments(),
    ])) as unknown as [Case[], number];

    if (!cases) {
      throw new BadRequestError("cases not found!");
    }

    const responseData = {
      cases: cases,
      totalCases: totalCases,
      currentPage: page,
      totalPages: Math.ceil(totalCases / limit),
    };

    //cache response
    caseCache.set(cacheKey, responseData);

    return responseData;
  }

  static async fetchCaseById(
    caseId: string,
    requesterId: string,
    requesterRole: string,
  ): Promise<Case> {
    assertCaseId(caseId);

    const caseData = await CaseModel.findById(caseId).lean();

    if (!caseData) {
      throw new BadRequestError("Case not found!");
    }
    return toCase(caseData);
  }

  static async updateCase(
    caseId: string,
    data: UpdateCaseDTO,
    requesterID: string,
    requesterRole: string,
  ): Promise<Case> {
    assertCaseId(caseId);

    const updateData = sanitizeUpdateData(data, requesterRole);
    const caseData = await CaseModel.findByIdAndUpdate(caseId, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!caseData) {
      throw new BadRequestError("Case not found!");
    }

    invalidateCaseCache();
    return toCase(caseData);
  }

  static async deleteCase(
    caseId: string,
    requesterId: string,
    requesterRole?: string,
  ): Promise<Case> {
    assertCaseId(caseId);

    const caseData = await CaseModel.findByIdAndDelete(caseId).lean();

    if (!caseData) {
      throw new BadRequestError("Case not found!");
    }

    invalidateCaseCache();
    return toCase(caseData);
  }
}
