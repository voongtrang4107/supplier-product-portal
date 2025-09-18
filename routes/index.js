import { Router } from "express";
import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

const router = Router();

router.get("/", async(req, res) => {
    const { supplier, q } = req.query;
    const filter = {};
    if (supplier) filter.supplier = supplier;
    if (q) filter.name = { $regex: q, $options: "i" };

    const [products, suppliers] = await Promise.all([
        Product.find(filter).populate("supplier").sort({ createdAt: -1 }).limit(12),
        Supplier.find().sort({ name: 1 })
    ]);

    res.render("index", { title: "Home", products, suppliers, currentSupplier: supplier || "", q: q || "" });
});

export default router;