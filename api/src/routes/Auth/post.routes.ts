import bcryptjs from "bcryptjs";
import { Response, Router } from "express";
import { body } from "express-validator";
import { generateToken, safeUser } from "../../middlewares/auth";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.post(
  "/auth/register",
  [
    body("username").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("confirmPassword").isString().isLength({ min: 6 }),
  ],
  async (
    req: TypedRequest<
      {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { username, email, password, confirmPassword, prisma } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS as string)
    );
    const safedUser = safeUser(
      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      })
    );
    const token = generateToken(safedUser);
    res.status(201).json({
      message: "User created successfully",
      data: {
        user: safedUser,
        token,
      },
    });
  }
);

router.post(
  "/auth/login",
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 })],
  async (
    req: TypedRequest<
      {
        email: string;
        password: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { email, password, prisma } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!bcryptjs.compareSync(password, user.password))
      return res.status(400).json({ message: "Invalid password" });
    const safedUser = safeUser(user);
    const token = generateToken(safedUser);
    res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: safedUser,
        token,
      },
    });
  }
);

export default router;
