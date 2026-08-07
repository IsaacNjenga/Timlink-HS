"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientSchema = exports.CreatePatientSchema = exports.PatientSchema = void 0;
const zod_1 = require("zod");
exports.PatientSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().toLowerCase().trim(),
    dateOfBirth: zod_1.z.string(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    phone: zod_1.z.string(),
    nextOfKin: zod_1.z.string(),
    referralType: zod_1.z.enum(["walk-in", "referral doctor", "website", "other"]),
    diagnosis: zod_1.z.string(),
    paymentMode: zod_1.z.string(),
    status: zod_1.z.enum([
        "New Lead",
        "Under Review",
        "Matched",
        "Scheduled",
        "Completed",
        "Closed",
    ]),
    notes: zod_1.z.string(),
    dateOfRegistration: zod_1.z.string(),
});
exports.CreatePatientSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().toLowerCase().trim(),
    dateOfBirth: zod_1.z.string(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    phone: zod_1.z.string().optional(),
    nextOfKin: zod_1.z.string().optional(),
    referralType: zod_1.z.enum(["walk-in", "referral doctor", "website", "other"]),
    diagnosis: zod_1.z.string().optional(),
    paymentMode: zod_1.z.string(),
    status: zod_1.z
        .enum([
        "New Lead",
        "Under Review",
        "Matched",
        "Scheduled",
        "Completed",
        "Closed",
    ])
        .optional(),
    notes: zod_1.z.string().optional(),
    dateOfRegistration: zod_1.z.string(),
});
exports.UpdatePatientSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().toLowerCase().trim().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    phone: zod_1.z.string().optional(),
    nextOfKin: zod_1.z.string().optional(),
    referralType: zod_1.z
        .enum(["walk-in", "referral doctor", "website", "other"])
        .optional(),
    diagnosis: zod_1.z.string().optional(),
    paymentMode: zod_1.z.string().optional(),
    status: zod_1.z
        .enum([
        "New Lead",
        "Under Review",
        "Matched",
        "Scheduled",
        "Completed",
        "Closed",
    ])
        .optional(),
    notes: zod_1.z.string().optional(),
    dateOfRegistration: zod_1.z.string().optional(),
});
//# sourceMappingURL=patient.schema.js.map