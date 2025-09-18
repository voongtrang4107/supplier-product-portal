import { Router } from "express";
import { ensureAuth } from "../middleware/auth.js";
import { listSuppliers, getCreate, postCreate, getEdit, postEdit, postDelete } from "../controllers/supplierController.js";

const router = Router();
router.get("/", ensureAuth, listSuppliers);
router.get("/create", ensureAuth, getCreate);
router.post("/create", ensureAuth, postCreate);
router.get("/:id/edit", ensureAuth, getEdit);
router.post("/:id/edit", ensureAuth, postEdit);
router.post("/:id/delete", ensureAuth, postDelete);

export default router;