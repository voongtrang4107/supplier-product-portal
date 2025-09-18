import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

export const listProducts = async(req, res) => {
    const { supplier, q } = req.query;
    const filter = {};
    if (supplier) filter.supplier = supplier;
    if (q) filter.name = { $regex: q, $options: "i" };

    const [products, suppliers] = await Promise.all([
        Product.find(filter).populate("supplier").sort({ createdAt: -1 }),
        Supplier.find().sort({ name: 1 })
    ]);

    res.render("products/index", { title: "Products", products, suppliers, currentSupplier: supplier || "", q: q || "" });
};

export const getCreate = async(req, res) => {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render("products/form", { title: "Create Product", product: {}, suppliers });
};

export const postCreate = async(req, res) => {
    const { name, price, qty, supplier } = req.body;
    await Product.create({ name, price, qty, supplier });
    res.redirect("/products");
};

export const getEdit = async(req, res) => {
    const [product, suppliers] = await Promise.all([
        Product.findById(req.params.id),
        Supplier.find().sort({ name: 1 })
    ]);
    res.render("products/form", { title: "Edit Product", product, suppliers });
};

export const postEdit = async(req, res) => {
    const { name, price, qty, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, qty, supplier });
    res.redirect("/products");
};

export const postDelete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
};