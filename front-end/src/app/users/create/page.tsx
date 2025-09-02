'use client'
import React, { useState } from "react";
import instance from "@/services/api";
import Link from "next/link";
import Menu from "@/app/components/Menu";

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
            setError(error.response.data.message);
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Menu />
            {/* Conteúdo principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Cadastrar Usuário</h1>
                    <Link href={'/users/list'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Listar</Link>
                </div>
                {/* Exibe mensagem de erro */}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {/* Exibe mensagem de sucesso */}
                {success && <p className="text-green-500 mt-4">{success}</p>}

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
                        <label htmlFor="email"  className="block text-sm font-semibold">Email: </label>
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