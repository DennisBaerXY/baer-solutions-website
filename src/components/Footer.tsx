import Link from "next/link";

const Footer = () => {
	const currentYear = new Date().getFullYear(); // Aktuelles Jahr

	return (
		<footer className="bg-background border-t border-gray-200 mt-16">
			<div className=" text-center">
				<div className="text-sm text-foreground/70 bg-background/60 backdrop-blur-sm rounded-full py-2 px-6 inline-block">
					<Link
						href="/impressum"
						className="hover:text-primary transition-colors mx-2"
					>
						Impressum
					</Link>
					<span className="text-foreground/40">|</span>
					<Link
						href="/datenschutz"
						className="hover:text-primary transition-colors mx-2"
					>
						Datenschutz
					</Link>
					<span className="text-foreground/40">|</span>
					<span className="mx-2">&copy; {currentYear} Bär Solutions</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
