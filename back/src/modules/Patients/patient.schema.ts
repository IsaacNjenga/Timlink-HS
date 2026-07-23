import { isObjectIdOrHexString } from "mongoose";
import { notStrictEqual } from "node:assert";
import { performServerHandshake } from "node:http2";
import { z } from "zod";

export const PatientSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().toLowerCase().trim(),
  dateOfBirth: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  phone: z.string(),
  nextOfKin: z.string(),
  referralType: z.enum(["walk-in", "referral doctor", "website", "other"]),
  diagnosis: z.string(),
  paymentMode: z.string(),
  status: z.enum([
    "New Lead",
    "Under Review",
    "Matched",
    "Scheduled",
    "Completed",
    "Closed",
  ]),
  notes: z.string(),
  dateOfRegistration: z.string(),
});

export const CreatePatientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().toLowerCase().trim(),
  dateOfBirth: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  phone: z.string().optional(),
  nextOfKin: z.string().optional(),
  referralType: z.enum(["walk-in", "referral doctor", "website", "other"]),
  diagnosis: z.string().optional(),
  paymentMode: z.string(),
  status: z
    .enum([
      "New Lead",
      "Under Review",
      "Matched",
      "Scheduled",
      "Completed",
      "Closed",
    ])
    .optional(),
  notes: z.string().optional(),
  dateOfRegistration: z.string(),
});

export const UpdatePatientSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().toLowerCase().trim().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  phone: z.string().optional(),
  nextOfKin: z.string().optional(),
  referralType: z
    .enum(["walk-in", "referral doctor", "website", "other"])
    .optional(),
  diagnosis: z.string().optional(),
  paymentMode: z.string().optional(),
  status: z
    .enum([
      "New Lead",
      "Under Review",
      "Matched",
      "Scheduled",
      "Completed",
      "Closed",
    ])
    .optional(),
  notes: z.string().optional(),
  dateOfRegistration: z.string().optional(),
});

export type CreatePatientInput = z.infer<typeof CreatePatientSchema>;
export type UpdatePatientInput = z.infer<typeof UpdatePatientSchema>;
