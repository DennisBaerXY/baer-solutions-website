import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Erstellen wir gleich
import Footer from "@/components/Footer"; // Erstellen wir gleich

// Schriftart konfigurieren
const inter = Inter({ subsets: ["latin"] });

// Standard Metadaten (können auf Seiten überschrieben werden)
export const metadata: Metadata = {
	title: {
		default: "Bär Solutions - Moderne IT- & Weblösungen",
		template: "%s | Bär Solutions" // Für Unterseiten-Titel
	},
	description:
		"Bär Solutions bietet maßgeschneiderte Webentwicklung und IT-Beratung für kleine und mittlere Unternehmen in Darmstadt und Umgebung."
	// Weitere Metadaten hinzufügen (keywords, open graph etc.)
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="de" className={inter.className}>
			<body className="flex flex-col min-h-screen">
				<main className="flex-grow">
					{/* Hauptinhalt nimmt verfügbaren Platz ein */}
					{children}
				</main>
			</body>
		</html>
	);
}
