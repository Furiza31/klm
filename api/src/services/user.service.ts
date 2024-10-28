import { PrismaClient } from "@prisma/client";

export class UserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async createUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        tasksGroups: {
          create: {
            title: "Default",
          },
        },
      },
    });

    return user;
  }

  public async getUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async updateUser(
    id: number | undefined,
    username?: string,
    email?: string,
    language?: string
  ) {
    if (!id) {
      throw new Error("User ID is required");
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        language,
      },
    });
  }
}
