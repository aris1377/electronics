import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";
import productController from "./controllers/product.controller";


/*SHOP*/
routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/signup", shopController.getSignup)
  .post("/signup", shopController.processSignup);
routerAdmin
    .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);

  routerAdmin.get("/logout", shopController.logout);
  routerAdmin.get("/check-me", shopController.checkAuthSession);

/*PRODUCT*/
routerAdmin.get("/product/all", productController.getAllProducts);
routerAdmin.post("/product/create", productController.createNewProduct);
routerAdmin.post("/product/:id", productController.updateChosenProduct);
/*USER*/

export default routerAdmin;
