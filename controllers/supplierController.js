import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";

export const listSuppliers = async(req, res) => {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.render("suppliers/index", { title: "Suppliers", suppliers });
};

export const getCreate = (req, res) => res.render("suppliers/form", { title: "Create Supplier", supplier: {} });

export const postCreate = async(req, res) => {
    const { name, address, phone } = req.body;
    await Supplier.create({ name, address, phone });
    res.redirect("/suppliers");
};

export const getEdit = async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.render("suppliers/form", { title: "Edit Supplier", supplier });
};

export const postEdit = async(req, res) => {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect("/suppliers");
};

export const postDelete = async(req, res) => {
    const id = req.params.id;
    const count = await Product.countDocuments({ supplier: id });
    if (count > 0) {
        return res.render("suppliers/index", { error: "Không thể xóa: còn sản phẩm liên kết", suppliers: await Supplier.find() });
    }
    await Supplier.findByIdAndDelete(id);
    res.redirect("/suppliers");
};