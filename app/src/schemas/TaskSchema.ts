import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const TaskSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(255),
    status: z.boolean().default(false),
    description: z.string().nullable().optional(),
    dueDate: z.string().nullable().optional(),
    dueTime: z.string().nullable().optional(),
    groupId: z.number(),
  })
);
