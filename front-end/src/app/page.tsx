import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Bem-Vindos!!</p>
      <Link href="/users/list">Usuários</Link> 
    </div>
  );
}
