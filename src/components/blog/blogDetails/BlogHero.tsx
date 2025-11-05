"use client";

import React, { useEffect, useState } from "react";

type BlogHeroProps = {
	title: string;
	breadcrumb?: string;
};

const BlogHero: React.FC<BlogHeroProps> = ({ title, breadcrumb }) => {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);

		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="relative min-h-[60vh] flex items-center bg-[var(--primary-blue)] overflow-hidden">
			{/* Floating Animated Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-16 left-8 w-16 h-16 bg-[var(--accent-blue)]/20 rounded-full blur-xl animate-float"></div>
				<div
					className="absolute top-32 right-24 w-28 h-28 bg-[var(--accent-blue)]/15 rounded-full blur-2xl animate-float"
					style={{ animationDelay: "0.8s" }}
				></div>
				<div
					className="absolute bottom-36 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"
					style={{ animationDelay: "1.6s" }}
				></div>
			</div>

			{/* Main Content */}
			<div className="container relative z-10 text-center text-white">
				<div className="space-y-4">
					{/* Title */}
					<h1
						className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? "translateY(0)" : "translateY(30px)",
						}}
					>
						{title}
					</h1>

					{/* Breadcrumb (defaults to "Blog" if none provided) */}
					<p
						className="text-lg text-white/80 transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? "translateY(0)" : "translateY(30px)",
							transitionDelay: "0.2s",
						}}
					>
						{breadcrumb || "Blog"}
					</p>
				</div>
			</div>
		</section>
	);
};

export default BlogHero;
