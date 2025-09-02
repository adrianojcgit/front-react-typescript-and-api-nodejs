'use client'
import instance from "@/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User{
    id: number,
    name: string,
    email: string
}

export default function Users(){

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

    return(
        <div>
            <h1>Listar Usuários</h1>          
            <Link href={'/users/create'}>Cadastrar</Link>
            {error && <p style={{color: "#f00"}}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>    
                <tbody>  
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {/*
                    { users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                        ))}*/}
                </tbody>
            </table>
        </div>
    )
}