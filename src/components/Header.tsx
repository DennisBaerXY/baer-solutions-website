import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
				{/* Logo / Site Name */}
				<Link
					href="/"
					className="text-2xl font-bold text-primary-dark hover:text-primary transition-colors"
				>
					Bär Solutions
				</Link>

				{/* Navigation Links (Desktop) */}
				{/* TODO: Mobile Menu hinzufügen (z.B. mit Headless UI oder einfacher JS-Logik) */}
				<div className="hidden md:flex space-x-6">
					<Link
						href="/leistungen"
						className="text-gray-700 hover:text-primary transition-colors"
					>
						Leistungen
					</Link>
					<Link
						href="/ueber-mich"
						className="text-gray-700 hover:text-primary transition-colors"
					>
						Über Mich
					</Link>
					{/* <Link href="/projekte" className="text-gray-700 hover:text-primary transition-colors">
            Projekte
          </Link> */}
					<Link
						href="/kontakt"
						className="text-gray-700 hover:text-primary transition-colors"
					>
						Kontakt
					</Link>
				</div>

				{/* Platzhalter für Mobile Menu Button */}
				<div className="md:hidden">
					<button className="text-gray-700 focus:outline-none">
						{/* Hier Icon für Burger-Menu einfügen (z.B. Heroicons) */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						</svg>
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
