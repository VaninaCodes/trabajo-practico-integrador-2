import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startDB } from "./src/config/database.js";
import dotenv from "dotenv";
// rutas
import {articleRouter} from "./src/routes/article.routes.js";
import {articleTagRouter} from "./src/routes/article_tag.routes.js";
import {tagRouter} from "./src/routes/tag.routes.js";
import {userRouter} from "./src/routes/user.routes.js";
import {authRouter} from "./src/routes/auth.routes.js";

dotenv.config();

const app= express();
const PORT = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", articleRouter);
app.use("/api", articleTagRouter);
app.use("/api", tagRouter);

app.listen(PORT, async() => {
    await startDB();
    console.log(`Servidor listo http://localhost:${PORT}`);
})