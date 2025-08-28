import express, { Request, Response} from 'express';
import { AppDataSource } from "./data-source";

//criar a aplicação express
const app = express();
//Criar a rota principal
app.get("/", ( req: Request, res: Response ) => {
    res.send("Bem-Vindo!");    
});
//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

//inicializar a conexão com o Banco
AppDataSource.initialize()
.then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
})
.catch((error) => console.log("Erro na conexão com o banco de dados: ", error));