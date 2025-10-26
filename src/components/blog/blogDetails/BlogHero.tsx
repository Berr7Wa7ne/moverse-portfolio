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

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className="relative min-h-[60vh] flex items-center bg-[var(--primary-blue)] overflow-hidden">
			{/* Background Image with Parallax */}
			<div 
				className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
				style={{
					backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
					transform: `translateY(${scrollY * 0.5}px)`,
				}}
			>
				<div className="absolute inset-0 bg-[var(--primary-blue)]/80"></div>
			</div>

			{/* Floating Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-20 h-20 bg-[var(--accent-blue)]/20 rounded-full blur-xl animate-float"></div>
				<div className="absolute top-40 right-20 w-32 h-32 bg-[var(--accent-blue)]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
				<div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
			</div>

			<div className="container relative z-10 text-center text-white">
				<div className="space-y-4">
					<p 
						className="text-[16px] text-gray-50 tracking-wider flex items-center justify-center gap-3 transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
						}}
					>
						<span className="block w-20 h-[2px] bg-gray-50"></span>
						{breadcrumb || 'Blog'}
					</p>
					<h1 
						className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
							transitionDelay: '0.2s',
						}}
					>
						{title}
					</h1>
				</div>
			</div>
		</section>
	);
};

export default BlogHero;














