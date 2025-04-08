import Link from "next/link";

const Footer = () => {
	const currentYear = new Date().getFullYear(); // Aktuelles Jahr

	return (
		<footer className="bg-gray-100 border-t border-gray-200 mt-16">
			<div className="container mx-auto px-4 py-6 text-center text-gray-600">
				<div className="flex justify-center space-x-4 mb-4">
					<Link
						href="/impressum"
						className="text-sm hover:text-primary transition-colors"
					>
						Impressum
					</Link>
					<Link
						href="/datenschutz"
						className="text-sm hover:text-primary transition-colors"
					>
						Datenschutz
					</Link>
				</div>
				<p className="text-sm">
					&copy; {currentYear} Bär Solutions. Alle Rechte vorbehalten.
				</p>
				{/* Optional: Social Media Links etc. */}
			</div>
		</footer>
	);
};

export default Footer;
