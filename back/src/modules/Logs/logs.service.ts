import { LogModel } from "./logs.model";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { type Request } from "express";
import { CreateLogDTO, LogEntry } from "./logs.types";
import NodeCache from "node-cache";

const logCache = new NodeCache({ stdTTL: 300 });

export const createLog = async (input: CreateLogDTO): Promise<LogEntry> => {
  if (!input) {
    throw new BadRequestError("Input data is required");
  }

  const logEntry = new LogModel(input);
  await logEntry.save();

  invalidateLogCache();
  return logEntry as unknown as LogEntry;
};

export const fetchLogs = async (
  req: Request,
): Promise<{ logs: LogEntry[] }> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const cacheKey = `logs_page_${page}_limit_${limit}`;
  const cachedData = logCache.get<LogEntry[]>(cacheKey);
  if (cachedData) {
    return {
      logs: cachedData,
    };
  }

  const [logs, totalLogs] = (await Promise.all([
    LogModel.find().skip(skip).limit(limit).lean().sort({ createdAt: -1 }),
    LogModel.countDocuments(),
  ])) as unknown as [LogEntry[], number];

  const responseData = {
    logs: logs,
    totalLogs: totalLogs,
    currentPage: page,
    totalPages: Math.ceil(totalLogs / limit),
  };

  //cache response
  logCache.set(cacheKey, responseData);
  return responseData;
};

//invalidation when a log is created/updated/deleted
export const invalidateLogCache = () => {
  logCache.flushAll();
};