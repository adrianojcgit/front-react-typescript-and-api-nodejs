//Importa a instância do axios configurada para fazer requisições para API
import instance from "@/services/api";

//Use a interface pois devemos tipar por se tratar de TypeScript
interface DeleteButtonProps{
    id: string;                 //Parâmetro ID do usuário a ser excluído
    route: string;              //Rota da API
    onSuccess?: () => void;     //Vair receber uma função callback de sucesso
    setError: (message:string | null) => void;      //Função callback para retornar mensagem de errro
    setSuccess: (message:string | null) => void;    //Função callback para retornar mensagem de sucesso
}

const DeleteButton = ({ id, route, onSuccess, setError, setSuccess }: DeleteButtonProps) => {
    const handleDelete = async () => {
        //Exibir alerta de confirmação
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este registro?");
        if(!confirmDelete) return;

        //Limpa mensagem de erro anterior
        setError(null);

        //Limpa mensagem de sucesso anterior
        setSuccess(null);

        try{
            //Fazer a requisição para a API
            const response = await instance.delete(`/${route}/${id}`);

            //Exibir mensagem de sucesso
            setSuccess(response.data.message || "Registro excluído com sucesso");

            //Chama a função de sucesso, se estiver definida
            if(onSuccess){
                onSuccess();
            }

        }catch(error: any){
            setError(error.response?.data?.message || "Erro ao excluir registro");
        }

    }
    return(
        <div>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteButton;