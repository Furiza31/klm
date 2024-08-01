import { Response, Router } from "express";
import { param } from "express-validator";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.get("/groups", async (req: TypedRequest<{}, {}>, res: Response) => {
  const { prisma, user } = req.body;
  const { id } = user!;
  const groups = await prisma.taskGroup.findMany({
    where: {
      userId: id,
    },
  });

  res.status(200).json({
    message: "Groups fetched successfully",
    data: {
      groups,
    },
  });
});

router.get(
  "/groups/:groupId/tasks",
  [param("groupId").isInt()],
  async (req: TypedRequest<{}, { groupId: number }>, res: Response) => {
    const { groupId } = req.params;
    const { prisma } = req.body;
    const tasks = await prisma.task.findMany({
      where: {
        groupId,
      },
    });

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: {
        tasks,
      },
    });
  }
);

export default router;
