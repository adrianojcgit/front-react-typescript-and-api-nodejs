import express, { Request, Response} from 'express';
//Importar a Controller
import UsersController from "./controllers/UsersController";
//import cors from "cors";

//criar a aplicação express
const app = express();
//Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());
//app.use(cors());
//Criar a rota
app.use('/', UsersController);
//Criar a rota principal
app.get("/", ( req: Request, res: Response ) => {
    res.send("Bem-Vindo!");    
});
//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

