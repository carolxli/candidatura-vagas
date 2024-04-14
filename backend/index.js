import express from "express";
import routerAuth from "./routes/rtLogin.js";
import userRoutes from  "./routes/rtUsers.js";
import vagaRoutes from "./routes/rtVagas.js";
import candidaturaRoutes from "./routes/rtCandidatura.js";
import cadUserRoutes from "./routes/rtCadUser.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/login", routerAuth);
app.use("/usuarios", userRoutes);
app.use("/cadastro-usuario",cadUserRoutes);
app.use("/perfil",cadUserRoutes);
app.use("/vagas", vagaRoutes);
app.use("/candidatura", candidaturaRoutes);
app.listen(8801);
