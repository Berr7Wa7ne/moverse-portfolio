"use client";

import React, { useEffect, useState } from "react";

type MemberHeroProps = {
	name: string;
	position: string;
};

const MemberHero: React.FC<MemberHeroProps> = ({ name, position }) => {
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
		<section className="relative bg-[var(--primary-blue)] py-20 lg:py-32 overflow-hidden">

			{/* Floating Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-20 h-20 bg-[var(--accent-blue)]/20 rounded-full blur-xl animate-float"></div>
				<div className="absolute top-40 right-20 w-32 h-32 bg-[var(--accent-blue)]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
				<div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
			</div>

			<div className="container relative z-10">
				<div className="text-center text-white">
					<p 
						className="text-[16px] text-gray-50 tracking-wider flex items-center justify-center gap-3 mb-4 transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
						}}
					>
						<span className="block w-20 h-[2px] bg-gray-50"></span>
						Team Member
					</p>
					<h1 
						className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
							transitionDelay: '0.2s',
						}}
					>
						{name}
					</h1>
					<p 
						className="text-xl md:text-2xl text-gray-200 transition-all duration-700 ease-out"
						style={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
							transitionDelay: '0.4s',
						}}
					>
						{position}
					</p>
				</div>
			</div>
		</section>
	);
};

export default MemberHero;














