import Link from "next/link";
import Menu from "@/app/components/Menu";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Menu/>
      <p>Bem-Vindos!!</p>
      <Link href="/users/list">Usuários</Link> 
    </div>
  );
}
