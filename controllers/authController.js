import User from "../models/User.js";

export const getLogin = (req, res) => res.render("login", { title: "Login" });
export const getRegister = (req, res) => res.render("register", { title: "Register" });
export const getForgot = (req, res) => res.render("forgot", { title: "Forgot Password" });

export const postRegister = async(req, res) => {
    const { username, email, phone, password } = req.body || {};
    try {
        const exists = await User.findOne({ $or: [{ username }, { email }] });
        if (exists) return res.render("register", { error: "Username hoặc email đã tồn tại" });

        const user = new User({ username, email, phone, passwordHash: "" });
        await user.setPassword(password);
        await user.save();

        req.session.userId = user._id.toString();
        req.session.user = { username: user.username, email: user.email };
        res.redirect("/");
    } catch (e) {
        console.error(e);
        res.render("register", { error: "Lỗi server" });
    }
};

export const postLogin = async(req, res) => {
    const { username, password } = req.body || {};
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.checkPassword(password))) {
            return res.render("login", { error: "Sai thông tin đăng nhập" });
        }
        req.session.userId = user._id.toString();
        req.session.user = { username: user.username, email: user.email };
        const to = req.session.returnTo || "/";
        delete req.session.returnTo;
        res.redirect(to);
    } catch (e) {
        console.error(e);
        res.render("login", { error: "Lỗi server" });
    }
};

export const postLogout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("sid");
        res.redirect("/login");
    });
};

export const postForgot = async(req, res) => {
    // Demo: chỉ hiển thị đã gửi mail
    res.render("forgot", { info: "Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi." });
};