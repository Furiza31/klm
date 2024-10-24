import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const OutcomeSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(255),
    value: z.number().negative().min(-1),
  })
);
