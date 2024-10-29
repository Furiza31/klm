import { Response, Router } from "express";
import { param } from "express-validator";
import { TaskService } from "../../services/task.service";
import { TaskGroupService } from "../../services/taskGroup.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.delete(
  "/taskGroups/:groupId",
  [param("groupId").isInt()],
  async (req: TypedRequest<{}, { groupId: string }>, res: Response) => {
    const { groupId } = req.params;
    const { prisma, user } = req.body;
    const { id } = user!;
    const taskGroupService = new TaskGroupService(prisma);

    let taskGroup;
    try {
      taskGroup = await taskGroupService.delete({
        id: parseInt(groupId),
        userId: id,
      });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

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
    const { id } = user!;
    const taskService = new TaskService(prisma);

    let task;
    try {
      task = await taskService.delete({
        id: parseInt(taskId),
        groupId: parseInt(groupId),
        userId: id,
      });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

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
    const { id } = user!;
    const taskGroupService = new TaskGroupService(prisma);

    let tasks;
    try {
      tasks = await taskGroupService.deleteCompletedTasks({
        id: parseInt(groupId),
        userId: id,
      });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

    res.status(200).json({
      message: "Tasks deleted successfully",
      data: {
        tasks,
      },
    });
  }
);

export default router;
