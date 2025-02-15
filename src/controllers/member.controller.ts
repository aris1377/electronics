import { Request, Response } from "express";
import { T } from "../libs/types/common";

const memberController: T = {};
memberController.goHome = (req: Request, res: Response) => {
    try {
        res.send("HomePage");
    } catch (err) { 
        console.error("Error, goHome", err);
    }
};

memberController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.error("Error, getLogin", err);
  }
};

memberController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (err) {
    console.error("Error, getSignup", err);
  }
};

export default memberController;