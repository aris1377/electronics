import express from "express";
const routerAdmin = express.Router();
import toysController from "./controllers/toys.controller";

routerAdmin.get("/", toysController.goHome);

routerAdmin.get("/login", toysController.getLogin);

routerAdmin.get("/signup", toysController.getSignup);

export default routerAdmin;
