export function ensureAuth(req, res, next) {
    if (req.session && req.session.userId) return next();
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
}

export function injectUser(req, res, next) {
    res.locals.currentUser =
        (req.session && req.session.user && req.session.user.username) || null;
    next();
}