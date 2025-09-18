import session from "express-session";
import MongoStore from "connect-mongo";

export default function createSession(mongoUrl, secret) {
    return session({
        name: "sid",
        secret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl, collectionName: "sessions" }),
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    });
}