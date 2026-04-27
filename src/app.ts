import express from "express";
import userRoutes from "./routes/user.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/registrations", registrationRoutes);

export default app;
