//importar a biblioteca Express
import express, { Request, Response } from "express";
//Importar a conexão com o BD
import { AppDataSource } from "../data-source";
//Importar a entidade User
import { User } from "../entity/User";
//Criar a aplicação Express
const router = express.Router();
//Criar a rota cadastrar usuário
router.post("/users", async (req: Request, res: Response) => {
    try{
        //Receber os dados enviados no corpo da requisição
        var data = req.body;
        //Criar uma instância do repositório user
        const userRepository = AppDataSource.getRepository(User);
        //Recuperar o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({ where: {email: data.email}});
        //Verficar se já existe usuário cadastrado com esse e-mail
        if(existingUser){
            res.status(400).json({
                message: "Já existe um usuário cadastrado com esse email!"
            });
        }
        //Criar um novo registro
        const newUser = userRepository.create(data);
        //Salvar o registro no banco de dados
        await userRepository.save(newUser);
        
        res.status(201).json({
            message: "Usuário cadastrado com  sucesso!",
            user: newUser,
        });
    }catch(error){
        res.status(500).json({
            message: "Erro ao cadastrar usuário!",
        });
    }
    res.send("Cadastrar");
});
//Exportar a instrução que está dentro da constante router
export default router;

//Rota Listar
router.get("/users", async (req: Request, res: Response) => {
    try {
        //Criar uma instância do repositório
        const userRepository = AppDataSource.getRepository(User);
        //Recupera todos os usuários do Banco de dados
        const users = await userRepository.find();
        //Retornar os usuários como resposta
        res.status(200).json(users);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar os usuários!"
        });
        return;
    }
});