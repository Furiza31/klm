import { PrismaClient } from "@prisma/client";

export class TaskService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async delete({
    id,
    groupId,
    userId,
  }: {
    id: number;
    groupId: number;
    userId: number | undefined;
  }) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id: groupId,
        userId: userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    return await this.prisma.task.delete({
      where: {
        id,
        groupId,
      },
    });
  }

  public async getTasks({
    groupId,
    userId,
  }: {
    groupId: number;
    userId: number | undefined;
  }) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id: groupId,
        userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    return await this.prisma.task.findMany({
      where: {
        groupId,
      },
    });
  }

  public async addTask({
    title,
    groupId,
    userId,
    description,
    status,
    dueDate,
    dueTime,
  }: {
    title: string;
    groupId: number;
    userId: number | undefined;
    description?: string;
    status?: boolean;
    dueDate?: Date;
    dueTime?: Date;
  }) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id: groupId,
        userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    return await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate,
        dueTime,
        groupId,
      },
    });
  }

  public async updateTask({
    id,
    groupId,
    userId,
    title,
    description,
    status,
    dueDate,
    dueTime,
  }: {
    id: number;
    groupId: number;
    userId: number | undefined;
    title?: string;
    description?: string;
    status?: boolean;
    dueDate?: Date;
    dueTime?: Date;
  }) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id: groupId,
        userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    const task = await this.prisma.task.findFirst({
      where: {
        id,
        groupId,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
        dueDate,
        dueTime,
      },
    });
  }

  public async getAllTasks({ userId }: { userId: number | undefined }) {
    if (!userId) throw new Error("User ID not found");

    const tasks = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tasksGroups: {
          include: {
            tasks: true,
          },
        },
      },
    });

    return tasks?.tasksGroups.flatMap((group) => group.tasks) || [];
  }
}
