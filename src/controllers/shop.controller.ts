import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

const shopController: T = {};
shopController.goHome = (req: Request, res: Response) => {
  try {
    res.send("HomePage");
  } catch (err) {
    console.error("Error, goHome", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.error("Error, getLogin", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (err) {
    console.error("Error, getSignup", err);
  }
};

export default shopController;
