import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  CreateProduct,
  getProduct,
  singleProduct,
  deleteProduct,
  UpdateProduct,
} from "../controllers/product.controller.js";
const router = Router();

router.route("/").post(verifyJWT, CreateProduct);
router.route("/").get(verifyJWT, getProduct);
router.route("/:id").get(verifyJWT, singleProduct);
router.route("/:id").delete(verifyJWT, deleteProduct);
router.route("/:id").patch(verifyJWT, UpdateProduct);

export default router;
