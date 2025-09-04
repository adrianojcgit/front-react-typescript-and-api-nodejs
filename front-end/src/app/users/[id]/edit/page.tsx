//A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser);
//Essa diretiva é especifica para o Next.js 13+ quando utiliza a renderização no lado do cliente.
'use client'
//Importa hooks do React para usar o estado "useState" e os efeitos colaterais "useEfect"
import React, { useEffect, useState } from "react";
//useParams - Acessar 9os parâmetros da URL de uma página que usa rotas dinâmicas.
import { useParams } from "next/navigation";
//Importa a instância do axios configurada para fazer requisições para API
import instance from "@/services/api";
//Importa o componente para criar  link
import Link from "next/link";
//Importa o componente com o Menu
import Menu from "@/app/components/Menu";

export default function EditeUser() {

    //Usando o useParams para acessar o parâmetro 'id' da URL
    const { id } = useParams();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchUserDetail = async () => {
        try {
            //Fazer requisição à API
            const response = await instance.get(`/users/${id}`);
            // console.log(response.data.user);
            setName(response.data.user.name);
            setEmail(response.data.user.email);

        } catch (error: any) {
            setError(error.response?.data?.message || "Erro ao carregar o usuário");
        }
    }

    //Função para enviar os dados para a API
    const handleSubmit = async (event: React.FormEvent) => {
        //Evita o recarregamento da página ao enviar o formulário
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await instance.put(`/users/${id}`, {
                name,
                email
            });
            setSuccess(response.data.message);
        } catch (error: any) {
            setError(error.response?.data?.message || "Erro ao atualizar o usuário");
        }
    }

    //Hook parra buscar os dados quando o id estiver disponível.
    //Executa o useEffect sempre que o parâmetro 'id' for atualizado.
    useEffect(() => {
        if (id) {
            //Busca os dados da situação se o 'id' estiver disponível
            fetchUserDetail();
        }
    }, [id]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />
            {/* Conteúdo principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Editar Usuário</h1>
                    <span>
                        <Link href={'/users/list'} className="bg-cyan-500 text-white px-4 py-2 me-1 rounded-md hover:bg-cyan-600">Listar</Link>
                        <Link href={`/users/${id}`} className="bg-blue-500 text-white px-4 py-2 me-1 rounded-md hover:bg-blue-600">Visualizar</Link>
                    </span>
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
                    <button type="submit" className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Salvar</button>
                </form>
            </div>
        </div>
    )
}