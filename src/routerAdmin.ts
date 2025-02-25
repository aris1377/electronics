import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";


/*SHOP*/
routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/signup", shopController.getSignup)
  .post("/signup", shopController.processSignup);
routerAdmin
    .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);
    
  routerAdmin.get("/check-me", shopController.checkAuthSession);

/*PRODUCT*/


/*USER*/

export default routerAdmin;
