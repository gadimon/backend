import express, { Request, Response, NextFunction } from "express";
import { loginUser, logoutUser, registerUser } from "../services/authService";
import { genarateToken } from "../utils/JWT";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const userMan = await loginUser(username, password);

    //V
    if (userMan) {
      const token = genarateToken(userMan._id as string);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
      });
      res.json({ userMan, token });
    }
  } catch (error: any) {
    console.error(error.message);
  }
});

router.get("/logout", (req: Request, res: Response): void => {
  try {
    logoutUser(res);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error(error.message);
  }
});
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    console.log("gadi");
    
    const user = await registerUser({ username, email, password, role });    
    if (user) {
      res.status(201).json({
        message: "user is sinup",
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("sinup field");
  }
});
router.get("/test", authMiddleware);

export default router;
