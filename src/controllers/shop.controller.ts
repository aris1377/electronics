import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Message } from "../libs/Errors";

const shopController: T = {};
const memberService = new MemberService();
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render('home');
  } catch (err) {
    console.error("Error, goHome", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render('signup');
  } catch (err) {
    console.error("Error, getSignup", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render('login');
  } catch (err) {
    console.error("Error, getLogin", err);
  }
};

shopController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.SHOP;
    const result = await memberService.processSignup(newMember);
    //sessions

    req.session.member = result;
    req.session.save(function () {
       res.send(result);
    });

  } catch (err) {
    console.error("Error, processSignup", err);
    res.send(err);
  }
};

shopController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body", req.body);
    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);
    //sessions
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.error("Error, getLogin", err);
    res.send(err);
  }
};

shopController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
     })
  } catch (err) {
    console.error("Error, logout", err);
    res.send(err);
  }
};

shopController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      res.send(`<script> alert ("${req.session.member.memberNick}")</script>`);
    else
      res.send(`<script> alert ("${Message.MOT_AUTHENTICATED}")</script>`);
    
  } catch (err) {
    console.error("Error, getLogin", err);
    res.send(err);
  }
};





export default shopController;
