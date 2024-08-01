import { Response, Router } from "express";
import { body, param } from "express-validator";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.put(
  "/groups/:groupId",
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
        groupId: number;
      }
    >,
    res: Response
  ) => {
    const { groupId } = req.params;
    const { prisma, title, user } = req.body;
    const { id } = user!;

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: groupId,
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
        id: groupId,
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
  "/groups/:groupId/tasks/:taskId",
  [
    param("groupId").isInt(),
    param("taskId").isInt(),
    body("title").isString().isLength({ min: 1, max: 255 }),
    body("description").isString().isLength({ min: 1, max: 255 }).optional(),
    body("status").isBoolean().optional(),
    body("dueDate").isDate().optional(),
  ],
  async (
    req: TypedRequest<
      {
        title: string;
        description?: string;
        status?: boolean;
        dueDate?: Date;
      },
      {
        groupId: number;
        taskId: number;
      }
    >,
    res: Response
  ) => {
    const { groupId, taskId } = req.params;
    const { prisma, title, description, status, dueDate, user } = req.body;
    const { id } = user!;

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: groupId,
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
        id: taskId,
        groupId: groupId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        dueDate,
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
