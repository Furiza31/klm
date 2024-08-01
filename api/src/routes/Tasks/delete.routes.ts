import { Response, Router } from "express";
import { param } from "express-validator";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.delete(
  "/groups/:groupId",
  [param("groupId").isInt()],
  async (req: TypedRequest<{}, { groupId: number }>, res: Response) => {
    const { groupId } = req.params;
    const { prisma, user } = req.body;
    const taskGroup = await prisma.taskGroup.delete({
      where: {
        id: groupId,
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
  "/groups/:groupId/tasks/:taskId",
  [param("groupId").isInt(), param("taskId").isInt()],
  async (
    req: TypedRequest<{}, { groupId: number; taskId: number }>,
    res: Response
  ) => {
    const { groupId, taskId } = req.params;
    const { prisma, user } = req.body;

    const taskGroup = await prisma.taskGroup.findFirst({
      where: {
        id: groupId,
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
        id: taskId,
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

export default router;
