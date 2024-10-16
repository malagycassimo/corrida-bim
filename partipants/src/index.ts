// importação de bibliotecas
import express from "express";
import { router } from "./routes";
import cors from "cors";
// Uso de Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Definição de porta e inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    router(app);
    console.log(`Servidor iniciado na porta ${PORT}`);
});
