import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import createSession from "./config/session.js";
import { injectUser } from "./middleware/auth.js";

import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import supplierRoutes from "./routes/suppliers.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(createSession(process.env.MONGO_URI, process.env.SESSION_SECRET));
app.use(injectUser);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running http://localhost:${port}`));
app.use(express.json());