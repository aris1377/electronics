import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const shopController: T = {};
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("HomePage");
  } catch (err) {
    console.error("Error, goHome", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page");
  } catch (err) {
    console.error("Error, getSignup", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page");
  } catch (err) {
    console.error("Error, getLogin", err);
  }
};

shopController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body", req.body);
    const input: LoginInput = req.body;

    const memberService = new MemberService();
    const result = await memberService.processLogin(input)
    
    res.send(result);
  } catch (err) {
    console.error("Error, getLogin", err);
    res.send(err);
  }
};

shopController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.SHOP;

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.error("Error, processSignup", err);
    res.send(err);
  }
};



export default shopController;
