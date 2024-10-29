import { Response, Router } from "express";
import { param } from "express-validator";
import { TaskService } from "../../services/task.service";
import { TaskGroupService } from "../../services/taskGroup.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.get("/taskGroups", async (req: TypedRequest<{}, {}>, res: Response) => {
  const { prisma, user } = req.body;
  const { id } = user!;
  const taskGroupService = new TaskGroupService(prisma);

  let groups;
  try {
    groups = await taskGroupService.getTaskGroups({ userId: id });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }

  res.status(200).json({
    message: "Groups fetched successfully",
    data: {
      groups,
    },
  });
});

router.get(
  "/taskGroups/:groupId/tasks",
  [param("groupId").isInt()],
  async (req: TypedRequest<{}, { groupId: string }>, res: Response) => {
    const { groupId } = req.params;
    const { prisma, user } = req.body;
    const { id } = user!;
    const taskService = new TaskService(prisma);

    let tasks;
    try {
      tasks = await taskService.getTasks({
        groupId: parseInt(groupId),
        userId: id,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: {
        tasks,
      },
    });
  }
);

export default router;
