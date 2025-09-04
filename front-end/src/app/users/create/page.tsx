//A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser);
//Essa diretiva é especifica para o Next.js 13+ quando utiliza a renderização no lado do cliente.
'use client'
//Importa hooks do React para usar o estado "useState" e os efeitos colaterais "useEfect"
import React, { useState } from "react";
//Importa a instância do axios configurada para fazer requisições para API
import instance from "@/services/api";
//Importa o componente para criar  link
import Link from "next/link";
//Importa o componente com o Menu
import Menu from "@/app/components/Menu";
//Importa o componente personalizado SweetAlert2
import AlertMessage from "@/app/components/AlertMessage";

export default function CreateUser() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    //Função para enviar os dados para a API
    const handleSubmit = async (event: React.FormEvent) => {
        //Evita o recarregamento da página ao enviar o formulário
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await instance.post("/users", {
                name,
                email
            });
            setSuccess(response.data.message);
            setName("");
            setEmail("");
        } catch (error: any) {
            setError(error.response?.data?.message || "Erro ao cadastrar o usuário");
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />
            {/* Conteúdo principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Cadastrar Usuário</h1>
                    <Link href={'/users/list'} className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600">Listar</Link>
                </div>

                {/* Exibe o alerta de erro */}
                <AlertMessage type="error" message={error} />

                {/* Exibe o alerta de sucesso */}
                <AlertMessage type="success" message={success} />

                <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-ls p-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold">Nome: </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Nome completo"
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold">Email: </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div><br />
                    <button type="submit" className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}