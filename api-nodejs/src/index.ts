//Importar bilbioteca express
import express, { Request, Response} from 'express';

//importar biblioteca para permitir conexão externa.
import cors from "cors";

//criar a aplicação express
const app = express();

//Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

//Criar o middleware para permitir requisição externa
app.use(cors());

//Importar a Controller
import UsersController from "./controllers/UsersController";

//Criar a rota
app.use('/', UsersController);

//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

