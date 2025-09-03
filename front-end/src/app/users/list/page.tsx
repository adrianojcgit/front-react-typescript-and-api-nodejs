//A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser);
//Essa diretiva é especifica para o Next.js 13+ quando utiliza a renderização no lado do cliente.
'use client'
//Importa a instância do axios configurada para fazer requisições para API
import instance from "@/services/api";
//Importa hooks do React para usar o estado "useState" e os efeitos colaterais "useEfect"
import { useEffect, useState } from "react";
//Importa o componente para criar  link
import Link from "next/link";
//Importa o componente com o Menu
import Menu from "@/app/components/Menu";

//Definir tipos para a resposta da API (obs.: necessário pois trabalhamos com TypeScript)
interface User {
    id: number,
    name: string,
    email: string
}

export default function Users() {
    //Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    //Estado para armazenar os usuários
    const [users, setUsers] = useState<User[]>([]);

    //Função para buscar os usuários da API
    const fetchUsers = async () => {
        try {
            //Fazer requisição à API
            const response = await instance.get("/users");

            //Atualiza o estado com os dados da API
            setUsers(response.data.users);

        } catch (error) {
            //Criar mensagem genérica de erro
            setError("Erro ao carregar os usuários" + error);
        }
    }

    //Hook parra buscar os dados naa primeira renderização: ocorerá aapenas uma vez.
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior*/}
            <Menu />

            {/* Conteúdo principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Listar Usuários</h1>
                    <Link href={'/users/create'} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Cadastrar</Link>
                </div>

                {/* Exibe mensagem de erro */}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div className="mt-6 bg-white shadow-md rounded-lg p-6">

                    {/* Tabela */}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-3 text-left">Id</th>
                                <th className="border p-3 text-left">Nome</th>
                                <th className="border p-3 text-left">Email</th>
                                <th className="border p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border p-3">{user.id}</td>
                                    <td className="border p-3">{user.name}</td>
                                    <td className="border p-3">{user.email}</td>
                                    <td className="border p-3">
                                        <Link href={`/users/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Visualizar</Link></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}