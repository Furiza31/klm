import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const TaskGroupSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(255),
  })
);
