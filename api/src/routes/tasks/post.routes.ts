import { Response, Router } from "express";
import { body, param } from "express-validator";
import { TaskService } from "../../services/task.service";
import { TaskGroupService } from "../../services/taskGroup.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.post(
  "/taskGroups",
  [body("title").isString().isLength({ min: 1, max: 255 })],
  async (
    req: TypedRequest<
      {
        title: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { prisma, user, title } = req.body;
    const { id } = user!;
    const taskGroupService = new TaskGroupService(prisma);

    let group;
    try {
      group = await taskGroupService.addTaskGroup({ title, userId: id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: `Group ${group.title} created successfully`,
      data: {
        group,
      },
    });
  }
);

router.post(
  "/taskGroups/:groupId/tasks",
  [
    param("groupId").isInt(),
    body("title").isString().isLength({ min: 1, max: 255 }),
    body("description").isString().isLength({ min: 1 }).optional(),
    body("status").isBoolean().optional(),
    body("dueDate").isDate().optional(),
    body("dueTime").isDate().optional(),
  ],
  async (
    req: TypedRequest<
      {
        title: string;
        description?: string;
        status?: boolean;
        dueDate?: Date;
        dueTime?: Date;
      },
      {
        groupId: string;
      }
    >,
    res: Response
  ) => {
    const { groupId } = req.params;
    const { prisma, title, description, status, dueDate, dueTime, user } =
      req.body;
    const { id } = user!;
    const taskService = new TaskService(prisma);

    let task;
    try {
      task = await taskService.addTask({
        title,
        groupId: parseInt(groupId),
        userId: id,
        description,
        status,
        dueDate,
        dueTime,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: `Task ${task.title} created successfully`,
      data: {
        task,
      },
    });
  }
);

export default router;
