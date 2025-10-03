"use client";

import React from "react";

type ExpertiseItem = { title: string; description: string };

type ServiceFeaturesProps = {
	title: string;
	description: string;
	items: ExpertiseItem[];
};

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ title, description, items }) => {
	return (
		<section className="">
			<div className="container">
				<div className="mb-8">
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary-blue)]">{title}</h2>
					<p className="mt-2 text-[var(--gray-600)] text-sm md:text-base lg:text-[15px] leading-relaxed max-w-5xl">
						{description}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.slice(0, 6).map((item, index) => (
						<div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
							<div className="w-10 h-10 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center font-semibold mb-4">
								{String(index + 1).padStart(2, '0')}
							</div>
							<h3 className="text-base md:text-lg font-semibold text-[var(--primary-blue)] mb-2">{item.title}</h3>
							<p className="text-[var(--gray-600)] text-sm leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServiceFeatures;





