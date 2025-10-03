"use client";

import React from "react";

type MemberHeroProps = {
	name: string;
	position: string;
};

const MemberHero: React.FC<MemberHeroProps> = ({ name, position }) => {
	return (
		<section className="relative bg-[var(--primary-blue)] py-20 lg:py-32">
			<div className="absolute inset-0 bg-black/20"></div>
			<div className="container relative z-10">
				<div className="text-center text-white">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{name}</h1>
					<p className="text-xl md:text-2xl text-gray-200">{position}</p>
				</div>
			</div>
		</section>
	);
};

export default MemberHero;














