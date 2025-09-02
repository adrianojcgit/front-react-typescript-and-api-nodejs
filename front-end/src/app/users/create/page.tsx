'use client'
import React, { useState } from "react";
import instance from "@/services/api";
import Link from "next/link";

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
        <div>
            <form onClick={handleSubmit}>
                <div>
                    <h1>Cadastrar Usuários</h1>
                    <Link href={'/users/list'}>Listar</Link>
                    {error && <p style={{ color: "#f00" }}>{error}</p>}
                    {success && <p style={{ color: "#086" }}>{success}</p>}<br /><br />
                    <label htmlFor="name">Nome: </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder="Nome completo"
                        onChange={(e) => setName(e.target.value)}
                        className="border p-1"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-1"
                    />
                </div><br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}