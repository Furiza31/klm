import { Response, Router } from "express";
import { body } from "express-validator";
import { safeUser } from "../../middlewares/auth";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.put(
  "/user",
  [
    body("username").isString().isLength({ min: 3 }).optional(),
    body("email").isEmail().optional(),
    body("language").isString().isLength({ min: 5, max: 5 }).optional(),
  ],
  async (
    req: TypedRequest<
      {
        username: string;
        email: string;
        language: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { username, email, language, prisma, user } = req.body;
    const { id } = user!;

    const updateData: {
      username?: string;
      email?: string;
      language?: string;
    } = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (language) updateData.language = language;

    const updatedUser = safeUser(
      await prisma.user.update({
        where: { id },
        data: updateData,
      })
    );

    res.status(200).json({
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  }
);

export default router;
