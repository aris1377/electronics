import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const shopController: T = {};
const memberService = new MemberService();
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render('home');
  } catch (err) {
    console.error("Error, goHome", err);
    res.redirect("/admin");
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render('signup');
  } catch (err) {
    console.error("Error, getSignup", err);
    res.redirect("/admin");
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render('login');
  } catch (err) {
    console.error("Error, getLogin", err);
    res.redirect("/admin");
  }
};

shopController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    console.log("req.body:", req.body);
    const file = req.file;
    console.log("processSignup:", file);
  
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.SHOP;
    const result = await memberService.processSignup(newMember);
    //sessions

    req.session.member = result;
    req.session.save(function () {
        res.redirect("/admin/product/all");
    });

  } catch (err) {
    console.error("Error, processSignup", err);
     const message =
       err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
     res.send(
       `<script> alert ("${message}"); window.location.replace('admin/signup') </script>`
     );
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
    const message = err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG
    res.send(
      `<script> alert ("${message}"); window.location.replace('admin/login') </script>`);
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
   res.redirect("/admin");
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

shopController.verifyShop = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.SHOP) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.MOT_AUTHENTICATED
    res.send(`<script> alert ("${message}"); window.location.replace('/admin/login'); </script>`);
  }
};



export default shopController;
