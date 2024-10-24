import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const IncomeAndOutcomeSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(255),
    value: z.number().positive().min(1),
  })
);
