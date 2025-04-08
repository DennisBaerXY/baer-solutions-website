"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import MonitorModel from "@/components/MonitorModel";
import { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function PlaceholderPage() {
	const email = "kontakt@baer-solutions.com";
	const subject = "Anfrage über Bär Solutions Webseite";
	const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

	// State für die Textanimation
	const words = ["Solutions", "Sicher", "Stark", "Schnell"];
	const [currentIndex, setCurrentIndex] = useState(0);

	// Effekt für die Textanimation (Wechsel alle 3 Sekunden)
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		}, 5000); // Ändert das Wort alle 3000ms (3 Sekunden)

		// Aufräumen beim Verlassen der Komponente
		return () => clearInterval(intervalId);
	}, []); // Abhängigkeit: Länge des Arrays

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-background to-background/90">
			{/* Hintergrundbild oder Animation */}
			<div>
				<AnimatedBackground />
			</div>
			<div className="relative z-10 flex flex-col w-full max-w-6xl mx-auto px-6 py-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					<div className="space-y-6">
						<div className="flex  items-baseline space-x-2 md:space-x-3">
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold whitespace-nowrap">
								Bär <span className="text-4xl/tight"> (en) </span> -
							</h1>
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold whitespace-nowrap">
								<TextTransition springConfig={presets.wobbly}>
									{words[currentIndex % words.length]}
								</TextTransition>
							</h1>
						</div>
						<p className="text-lg text-foreground/80 max-w-md">
							Moderne, Zukunftsorientierte und Zuverlässige Webseiten für Ihr
							Unternehmen.
						</p>
						<div className="pt-2">
							<Button asChild size="lg">
								<Link href={mailtoHref}>Kontakt aufnehmen</Link>
							</Button>
						</div>
					</div>

					<div className="hidden lg:block relative h-[600px] overflow-hidden">
						<div className="absolute inset-0">
							<MonitorModel />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
