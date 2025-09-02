'use client'
import instance from "@/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import Menu from "@/app/components/Menu";

interface User {
    id: number,
    name: string,
    email: string
}

export default function Users() {

    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await instance.get("/users");
            setUsers(response.data);
        } catch (error) {
            setError("Erro ao carregar os usuários");
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
                         
                        <tr className="hover:bg-gray-100">
                            <td className="border p-3">1</td>
                            <td className="border p-3"></td>
                            <td className="border p-3"></td>
                            <td className="border p-3"></td>
                        </tr>
                       {/*
                    { users.map((user) => (
                        <tr key={user.id}  className="hover:bg-gray-100">
                            <td className="border p-3">{user.id}</td>
                            <td className="border p-3">{user.name}</td>
                            <td className="border p-3">{user.email}</td>
                            <td className="border p-3"></td>
                        </tr>
                        ))}
                       */} 
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}