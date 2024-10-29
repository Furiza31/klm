import { Response, Router } from "express";
import { body, param } from "express-validator";
import { TaskService } from "../../services/task.service";
import { TaskGroupService } from "../../services/taskGroup.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.put(
  "/taskGroups/:groupId",
  [
    param("groupId").isInt(),
    body("title").isString().isLength({ min: 1, max: 255 }),
  ],
  async (
    req: TypedRequest<
      {
        title: string;
      },
      {
        groupId: string;
      }
    >,
    res: Response
  ) => {
    const { groupId } = req.params;
    const { prisma, title, user } = req.body;
    const { id } = user!;
    const taskGroupService = new TaskGroupService(prisma);

    let group;
    try {
      group = await taskGroupService.updateTaskGroup({
        id: parseInt(groupId),
        title,
        userId: id,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: `Group ${group.title} updated successfully`,
      data: {
        group: group,
      },
    });
  }
);

router.put(
  "/taskGroups/:groupId/tasks/:taskId",
  [
    param("groupId").isInt(),
    param("taskId").isInt(),
    body("title").isString().isLength({ min: 1, max: 255 }),
    body("description").isString().isLength({ min: 1, max: 255 }).optional(),
    body("status").isBoolean().optional(),
    body("dueDate").isDate().optional(),
    body("dueTime").isDate().optional(),
  ],
  async (
    req: TypedRequest<
      {
        title?: string;
        description?: string;
        status?: boolean;
        dueDate?: Date;
        dueTime?: Date;
      },
      {
        groupId: string;
        taskId: string;
      }
    >,
    res: Response
  ) => {
    const { groupId, taskId } = req.params;
    const { prisma, title, description, status, dueDate, dueTime, user } =
      req.body;
    const { id } = user!;
    const taskService = new TaskService(prisma);

    let task;
    try {
      task = await taskService.updateTask({
        id: parseInt(taskId),
        groupId: parseInt(groupId),
        userId: id,
        title,
        description,
        status,
        dueDate,
        dueTime,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: `Task ${task.title} updated successfully`,
      data: {
        task: task,
      },
    });
  }
);

export default router;
