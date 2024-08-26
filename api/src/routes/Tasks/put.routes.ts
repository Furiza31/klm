import { Response, Router } from "express";
import { body, param } from "express-validator";
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

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: parseInt(groupId),
        userId: id,
      },
    });

    if (!taskGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const updatedGroup = await prisma.taskGroup.update({
      where: {
        id: parseInt(groupId),
      },
      data: {
        title,
      },
    });

    res.status(200).json({
      message: `Group ${updatedGroup.title} updated successfully`,
      data: {
        group: updatedGroup,
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

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: parseInt(groupId),
        userId: id,
      },
    });

    if (!taskGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(taskId),
        groupId: parseInt(groupId),
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        title,
        description,
        status,
        dueDate,
        dueTime,
      },
    });

    res.status(200).json({
      message: `Task ${updatedTask.title} updated successfully`,
      data: {
        task: updatedTask,
      },
    });
  }
);

export default router;
