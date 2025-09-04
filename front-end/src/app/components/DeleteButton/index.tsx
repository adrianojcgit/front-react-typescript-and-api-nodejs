//A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser);
//Essa diretiva é especifica para o Next.js 13+ quando utiliza a renderização no lado do cliente.
'use client'
//SweetAlert2 para apresentar o alerta de confirmação
import Swal from "sweetalert2";
//Importa a instância do axios configurada para fazer requisições para API
import instance from "@/services/api";

//Use a interface pois devemos tipar por se tratar de TypeScript
interface DeleteButtonProps {
    id: string;                 //Parâmetro ID do usuário a ser excluído
    route: string;              //Rota da API
    onSuccess?: () => void;     //Vair receber uma função callback de sucesso
    setError: (message: string | null) => void;      //Função callback para retornar mensagem de errro
    setSuccess: (message: string | null) => void;    //Função callback para retornar mensagem de sucesso
}

const DeleteButton = ({ id, route, onSuccess, setError, setSuccess }: DeleteButtonProps) => {
    const handleDelete = async () => {
        //Exibir alerta de confirmação
        const confirmDelete = await Swal.fire({
            title: "Confirma exclusão do rgistro?",
            text: "Esta ação não poderá ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, Excluir!",
            cancelButtonText: "Cancelar"
        });

        if (!confirmDelete.isConfirmed) return;

        //Limpa mensagem de erro anterior
        setError(null);

        //Limpa mensagem de sucesso anterior
        setSuccess(null);

        try {
            //Fazer a requisição para a API
            const response = await instance.delete(`/${route}/${id}`);

            //Exibir mensagem de sucesso
            setSuccess(response.data.message || "Registro excluído com sucesso");

            //Chama a função de sucesso, se estiver definida
            if (onSuccess) {
                onSuccess();
            }

        } catch (error: any) {
            setError(error.response?.data?.message || "Erro ao excluir registro");
        }

    }
    return (
        <div>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteButton;