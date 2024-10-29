import { Response, Router } from "express";
import { body } from "express-validator";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
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
    const userService = new UserService(prisma);

    let updatedUser;
    try {
      updatedUser = await userService.updateUser({
        id,
        username,
        email,
        language,
      });
      updatedUser = AuthService.safeUser({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  }
);

export default router;
