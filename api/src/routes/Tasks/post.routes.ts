import { Response, Router } from "express";
import { body, param } from "express-validator";
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
    const group = await prisma.taskGroup.create({
      data: {
        title,
        userId: id!,
      },
    });

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

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate,
        dueTime,
        groupId: taskGroup.id,
      },
    });

    res.status(200).json({
      message: `Task ${task.title} created successfully`,
      data: {
        task,
      },
    });
  }
);

export default router;
