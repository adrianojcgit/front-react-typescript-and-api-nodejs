import Link from "next/link";

const Menu = () => {
    return(
        <div className="bg-blue-700 text-white p-4 w-full">
            <div className="max-w-6xl mx-auto flex items-center">
                <h2 className="text-xl font-bold"><Link href="/">Home</Link></h2>
                <ul className="flex space-x-6 ml-6">
                    <li><Link href="/users/list" className="hover:text-gray-300">Usuários</Link></li>
                    <li><Link href="#" className="hover:text-gray-300">Sair</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;