import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { type Request } from "express";

const hospitalCache = new NodeCache({ stdTTL: 300 });

const invalidateHospitalCache = (): void => {
  hospitalCache.flushAll();
};

export class HospitalService {}
