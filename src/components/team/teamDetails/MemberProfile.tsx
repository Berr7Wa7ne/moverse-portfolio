"use client";

import React from "react";

type Skill = { name: string; percentage: number };
type Social = { facebook?: string; twitter?: string; instagram?: string; linkedin?: string };

type MemberProfileProps = {
	name: string;
	position: string;
	bio: string;
	email: string;
	phone: string;
	experience: string;
	image: string;
	social: Social;
};

export const MemberProfile: React.FC<MemberProfileProps> = ({ name, position, bio, email, phone, experience, image, social }) => {
	return (
		<section className="section-padding bg-white">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					<div className="relative">
						<img src={image} alt={name} className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg" />
					</div>
					<div>
						<h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-6">{name}</h2>
						<h3 className="text-xl text-[var(--accent-blue)] mb-6">{position}</h3>
						<p className="text-[var(--gray-600)] text-lg leading-relaxed mb-8">{bio}</p>
						<div className="space-y-4 mb-8">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-[var(--accent-blue)] rounded-full flex items-center justify-center">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</div>
								<span className="text-[var(--gray-600)]">{email}</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-[var(--accent-blue)] rounded-full flex items-center justify-center">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
									</svg>
								</div>
								<span className="text-[var(--gray-600)]">{phone}</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-[var(--accent-blue)] rounded-full flex items-center justify-center">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
										<path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
									</svg>
								</div>
								<span className="text-[var(--gray-600)]">{experience}</span>
							</div>
						</div>
						<div>
							<h4 className="text-lg font-semibold text-[var(--primary-blue)] mb-4">CONNECT NOW</h4>
							<div className="flex gap-4">
								{social.facebook && (
									<a href={social.facebook} className="w-10 h-10 bg-[var(--accent-blue)] rounded-full flex items-center justify-center hover:bg-[var(--primary-blue)] transition-colors">
										<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
										</svg>
									</a>
								)}
								{social.twitter && (
									<a href={social.twitter} className="w-10 h-10 bg-[var(--accent-blue)] rounded-full flex items-center justify-center hover:bg-[var(--primary-blue)] transition-colors">
										<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
											<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
										</svg>
									</a>
								)}
								{social.instagram && (
									<a href={social.instagram} className="w-10 h-10 bg-[var(--accent-blue)] rounded-full flex items-center justify-center hover:bg-[var(--primary-blue)] transition-colors">
										<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
										</svg>
									</a>
								)}
								{social.linkedin && (
									<a href={social.linkedin} className="w-10 h-10 bg-[var(--accent-blue)] rounded-full flex items-center justify-center hover:bg-[var(--primary-blue)] transition-colors">
										<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
										</svg>
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
                </div >
			</section>
	);
};

type MemberSkillsProps = { name: string; skills: Skill[] };

export const MemberSkills: React.FC<MemberSkillsProps> = ({ name, skills }) => {
	return (
		<section className="section-padding bg-gray-50">
			<div className="container">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">Skills</h2>
					<p className="text-[var(--gray-600)] text-lg max-w-2xl mx-auto">{name}'s expertise and professional skills that contribute to our team's success.</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{skills.map((skill, index) => (
						<div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="flex justify-between items-center mb-2">
								<h3 className="text-lg font-semibold text-[var(--primary-blue)]">{skill.name}</h3>
								<span className="text-[var(--gray-600)] font-medium">{skill.percentage}%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3">
								<div className="bg-[var(--accent-blue)] h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: `${skill.percentage}%` }}></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default {};


