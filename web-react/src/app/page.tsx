'use client'
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import User from "@/components/User";
import { useState } from "react";

const Home = () => {
  const [nameUser, setNameUser] = useState("Adriano");
  return (
  <div>
    <Menu /><br/>
   <User name={nameUser}>
				<p>Este é um conteúdo extra fornecido como children.</p>
			  </User>
			  <h2>Bem-vindo!!</h2><br />
			  <button onClick={() => setNameUser("Nicolas")}>Alterar</button>
    <Footer />
  </div>
  );
}
export default Home;
