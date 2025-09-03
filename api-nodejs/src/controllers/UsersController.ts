//importar a biblioteca Express
import express, { Request, Response } from "express";
//Importar a conexão com o BD
import { AppDataSource } from "../data-source";
//Importar a entidade User
import { User } from "../entity/User";
import { Not } from "typeorm";

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

//Rota Listar
router.get("/users", async (req: Request, res: Response) => {
    try {
        //Criar uma instância do repositório
        const userRepository = AppDataSource.getRepository(User);
        //Recupera todos os usuários do Banco de dados
        const users = await userRepository.find();
        console.log(users);
        //Retornar os usuários como resposta
        res.status(200).json({users});
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar os usuários!"
        });
        return;
    }
});

//Criar a rota para visualizar detalhes do usuário
router.get("/users/:id", async (req: Request, res: Response) =>{
    try {
        //Obter o id do usuário a partir dos parâmetros da requisição
        const { id } = req.params;
        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);
        //Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({id: parseInt(id)});
        //Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!!"
            });
            return;
        }        
        //Retorna o usuário encontrado
        res.status(200).json({
            user: user
        });        
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar o usuário!"
        });
        return;
    }
});

//Criar para editar usuário
router.put("/users/:id", async (req: Request, res: Response) =>{
    try {
        //Obter o id do usuário a partir dos parâmetros da requisição
        const { id } = req.params;
        //Receber os dados enviados no corpo da requisição
        const data = req.body;
        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);
        //Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        //Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!!"
            });
            return;
        }
        //Verificar se existe um outro usuário com o mesmo email
        const existingUser = await userRepository.findOne({
            where: {
                email: data.email,
                id: Not(parseInt(id)),
            }
        })
        //Verifica se o usuário foi encontrado
        if(existingUser){
            res.status(400).json({
                message: "Já existe um usuário cadastrado com esse email!",
            });
            return;
        }
        //Atualizar os dados do usuário
        userRepository.merge(user, data)
        //Salvar as alterações no banco de dados
        const updateUser = await userRepository.save(user);
        //Retorna a resposta de sucesso!
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updateUser,
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao editar o usuário!"
        });
        return;
    }
});

//Criar rota excluir usuário
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        //Obter o id do usuário a partir dos parâmetros da requisição
        const { id } = req.params;
        //Criar uma instância do repositório user
        const userRepository = AppDataSource.getRepository(User);
        //Recuperar o registro do banco de dados com o valor da coluna email
        const user = await userRepository.findOneBy({ id: parseInt(id)});
        //Verficar se já existe usuário cadastrado com esse e-mail
        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!",
            });
            return;
        }
        //Remove registro
        await userRepository.remove(user);

        res.status(200).json({
            message: "Usuário excluído com  sucesso!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao excluir usuário!"
        });
    }
});

//Criar para editar usuário
router.put("/users/:id", async (req: Request, res: Response) =>{
    try {
        //Obter o id do usuário a partir dos parâmetros da requisição
        const { id } = req.params;
        //Receber os dados enviados no corpo da requisição
        const data = req.body;
        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);
        //Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        //Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!!"
            });
            return;
        }
        //Verificar se existe um outro usuário com o mesmo email
        const existingUser = await userRepository.findOne({
            where: {
                email: data.email,
                id: Not(parseInt(id)),
            }
        })
        //Verifica se o usuário foi encontrado
        if(existingUser){
            res.status(400).json({
                message: "Já existe um usuário cadastrado com esse email!",
            });
            return;
        }
        //Atualizar os dados do usuário
        userRepository.merge(user, data)
        //Salvar as alterações no banco de dados
        const updateUser = await userRepository.save(user);
        //Retorna a resposta de sucesso!
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updateUser,
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao editar o usuário!"
        });
        return;
    }

});

//Exportar a instrução que está dentro da constante router
export default router;