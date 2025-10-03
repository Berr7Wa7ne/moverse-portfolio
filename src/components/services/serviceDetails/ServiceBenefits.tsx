"use client";

import React from "react";

type ServiceBenefitsProps = {
	title: string;
	intro: string;
	items: string[];
};

const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({ title, intro, items }) => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-blue)]">{title}</h2>
                </div>
                <p className="text-[var(--gray-600)] text-sm md:text-base max-w-5xl leading-7 mb-6">
                    {intro}
                </p>
                <div className="space-y-4">
                    {items.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex items-center justify-center">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent-blue)]">
                                    <span className="w-2.5 h-2.5 rounded-full bg-white/90"></span>
                                </span>
                            </span>
                            <p className="text-[var(--gray-700)] text-sm md:text-base leading-7">
                                {benefit}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceBenefits;





