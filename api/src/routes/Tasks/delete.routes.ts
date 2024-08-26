import { Response, Router } from "express";
import { param } from "express-validator";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.delete(
  "/taskGroups/:groupId",
  [param("groupId").isInt()],
  async (req: TypedRequest<{}, { groupId: string }>, res: Response) => {
    const { groupId } = req.params;
    const { prisma, user } = req.body;
    const taskGroup = await prisma.taskGroup.delete({
      where: {
        id: parseInt(groupId),
        userId: user!.id,
      },
    });

    res.status(200).json({
      message: "Group deleted successfully",
      data: {
        taskGroup,
      },
    });
  }
);

router.delete(
  "/taskGroups/:groupId/tasks/:taskId",
  [param("groupId").isInt(), param("taskId").isInt()],
  async (
    req: TypedRequest<{}, { groupId: string; taskId: string }>,
    res: Response
  ) => {
    const { groupId, taskId } = req.params;
    const { prisma, user } = req.body;

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: parseInt(groupId),
        userId: user!.id,
      },
    });

    if (!taskGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const task = await prisma.task.delete({
      where: {
        id: parseInt(taskId),
        groupId: taskGroup.id,
      },
    });

    res.status(200).json({
      message: "Task deleted successfully",
      data: {
        task,
      },
    });
  }
);

router.delete(
  "/taskGroups/:groupId/completedTasks",
  [param("groupId").isInt()],
  async (req: TypedRequest<{}, { groupId: string }>, res: Response) => {
    const { groupId } = req.params;
    const { prisma, user } = req.body;

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: parseInt(groupId),
        userId: user!.id,
      },
    });

    if (!taskGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const tasks = await prisma.task.deleteMany({
      where: {
        groupId: taskGroup.id,
        status: true,
      },
    });

    res.status(200).json({
      message: "Tasks deleted successfully",
      data: {
        tasks,
      },
    });
  }
);

export default router;
