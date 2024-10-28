import { PrismaClient } from "@prisma/client";

export class TaskGroupService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async delete(id: number, userId: number | undefined) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    return await this.prisma.taskGroup.delete({
      where: {
        id,
        userId,
      },
    });
  }

  public async deleteCompletedTasks(id: number, userId: number | undefined) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    return await this.prisma.task.deleteMany({
      where: {
        groupId: id,
        status: true,
      },
    });
  }

  public async getTaskGroups(userId: number | undefined) {
    if (!userId) throw new Error("User ID not found");

    return await this.prisma.taskGroup.findMany({
      where: {
        userId,
      },
    });
  }

  public async addTaskGroup(title: string, userId: number | undefined) {
    if (!userId) throw new Error("User ID not found");

    return await this.prisma.taskGroup.create({
      data: {
        title,
        userId,
      },
    });
  }

  public async updateTaskGroup(
    id: number,
    title: string,
    userId: number | undefined
  ) {
    if (!userId) throw new Error("User ID not found");

    const taskGroup = await this.prisma.taskGroup.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!taskGroup) throw new Error("Task Group not found");

    return await this.prisma.taskGroup.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
  }
}
