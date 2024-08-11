import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./utils/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

app.use("/api", protect, router);
//app.use("/api", router);
app.post("/signup", createUser);
app.post("/signin", signIn);
export default app;
