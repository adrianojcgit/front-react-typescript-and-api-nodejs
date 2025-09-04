//A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser);
//Essa diretiva é especifica para o Next.js 13+ quando utiliza a renderização no lado do cliente.
'use client'
//Importa hooks do React para usar o estado "useState" e os efeitos colaterais "useEfect"
import { useEffect, useState } from "react";
//useParams - Acessar 9os parâmetros da URL de uma página que usa rotas dinâmicas.
//Importar hooks usado para manipular a navegação do usuário
import { useParams, useRouter } from "next/navigation";
//Importa a instância do axios configurada para fazer requisições para API
import instance from "@/services/api";
//Importa o componente para criar  link
import Link from "next/link";
//Importa o componente com o Menu
import Menu from "@/app/components/Menu";
//Importa o componente Botão Delete
import DeleteButton from "@/app/components/DeleteButton";
//Importa o componente personalizado SweetAlert2
import AlertMessage from "@/app/components/AlertMessage";

//Definir tipos para a resposta da API (obs.: necessário pois trabalhamos com TypeScript)
interface User {
    id: number,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
}

export default function UserDetails() {
    //Usando o useParams para acessar o parâmetro 'id' da URL
    const { id } = useParams();

    //Instanciar objeto router
    const router = useRouter();

    //Estado para armazenar o usuário
    const [user, setUser] = useState<User | null>(null);

    //Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    //Estado para controle de sucesso
    const [success, setSuccess] = useState<string | null>(null);

    const fetchUserDetail = async (id: string) => {
        try {
            //Fazer requisição à API
            const response = await instance.get(`/users/${id}`);

            //Atualizar o estado com os dados da API
            setUser(response.data.user);

        } catch (error: any) {
            setError(error.response?.data?.message || "Erro ao carregar o usuário");
        }
    }

    //Redirecionar para a página listar após deletar o registro
    const handleSuccess = () => {        
        //Salvar a mensagem no sessionStorage antes de redirecionar
        sessionStorage.setItem("successMessage", "Registro excluído com sucesso");

        //Redirecionar para página de listar
        router.push("/users/list");
    }

    //Hook parra buscar os dados quando o id estiver disponível.
    //Executa o useEffect sempre que o parâmetro 'id' for atualizado.
    useEffect(() => {
        if (id) {
            //Garantir que id seja uma string
            const userId = Array.isArray(id) ? id[0] : id;
            //Busca os dados da situação se o 'id' estiver disponível
            fetchUserDetail(userId);
        }
    }, [id]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />

            {/* Conteúdo principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
                    <span className="flex space-x-1">
                        <Link href={'/users/list'} className="bg-cyan-500 text-white px-2 py-1 rounded-md hover:bg-cyan-600">Listar</Link>
                        <Link href={`/users/${id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">Editar</Link>
                        {user && !error && (
                            <DeleteButton 
                                id={String(user.id)}
                                route="users"
                                onSuccess={handleSuccess}
                                setError={setError}
                                setSuccess={setSuccess}
                            />
                        )}
                    </span>
                </div>

                {/* Exibe o alerta de erro */}
                <AlertMessage type="error" message={error} />

                {/* Exibe o alerta de sucesso */}
                <AlertMessage type="success" message={success} />

                {user && !error && (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informações do Usuário</h2>
                        <div className="text-gray-700">
                            <div className="mb-1"><span className="font-bold">ID: </span>{user.id}</div>
                            <div className="mb-1"><span className="font-bold">Nome: </span>{user.name}</div>
                            <div className="mb-1"><span className="font-bold">E-mail: </span>{user.email}</div>
                            <div className="mb-1"><span className="font-bold">Criado em: </span>{new Date(user.createdAt).toLocaleString()}</div>
                            <div className="mb-1"><span className="font-bold">Editado em: </span>{new Date(user.updatedAt).toLocaleString()}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}