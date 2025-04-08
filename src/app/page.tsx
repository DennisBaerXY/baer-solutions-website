import { Button } from "@/components/ui/button"; // Importiere den shadcn/ui Button
import type { Metadata } from "next";
import Link from "next/link"; // Importiere Link für Mailto

// Metadaten für die Platzhalterseite
export const metadata: Metadata = {
	title: "Bär Solutions - Bald online | IT- & Weblösungen aus Darmstadt",
	description:
		"Bär Solutions bereitet den Start vor. Kontaktieren Sie uns schon jetzt für moderne IT- und Weblösungen."
};

export default function PlaceholderPage() {
	const email = "kontakt@baer-solutions.com"; // <-- Deine E-Mail-Adresse hier eintragen!
	const subject = "Anfrage über Bär Solutions Webseite";
	const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-slate-50 text-center p-6">
			{/* Optional: Ein einfacher Logo-Platzhalter oder Text */}
			<div className="mb-8">
				<span className="text-5xl font-bold text-primary">Bär-</span>
				<span className="text-5xl font-bold text-foreground">Solutions</span>
				<p className="text-sm text-muted-foreground mt-1">
					Moderne IT- & Weblösungen
				</p>
			</div>

			<div className="max-w-xl">
				<h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
					Wir bauen gerade etwas Großartiges für Sie!
				</h1>
				<p className="text-lg text-muted-foreground mb-8">
					Die neue Webseite von Bär Solutions ist bald für Sie da
				</p>

				<p className="text-md text-foreground mb-8">
					Sie möchten nicht warten? Wir sind schon jetzt für Sie erreichbar!
				</p>

				{/* Call-to-Action Button */}
				<Button asChild size="lg">
					{/* Benutze Link für mailto:, damit es wie ein normaler Link behandelt wird */}
					<Link href={mailtoHref}>Kontakt aufnehmen</Link>
				</Button>

				{/* Optional: Footer mit Impressum/Datenschutz-Links, wenn schon vorhanden */}
				<div className="mt-16 text-xs text-muted-foreground">
					{/* Beispiel: Links einfügen, wenn Seiten existieren */}
					<Link href="/impressum" className="hover:underline mx-2">
						Impressum
					</Link>{" "}
					|
					<Link href="/datenschutz" className="hover:underline mx-2">
						Datenschutz
					</Link>
					&copy; {new Date().getFullYear()} Bär Solutions
				</div>
			</div>
		</div>
	);
}
