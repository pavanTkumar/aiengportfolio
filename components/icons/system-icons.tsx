'use client';

import { motion } from 'framer-motion';

interface IconProps {
	className?: string;
	size?: number;
	color?: string;
}

const hoverGlow = {
	rest: { filter: 'drop-shadow(0 0 0px rgba(0,255,255,0))' },
	hover: { filter: 'drop-shadow(0 0 6px rgba(0,255,255,0.6))' },
};

export function LocationIcon({ className = '', size = 24, color = '#00ffff' }: IconProps) {
	return (
		<motion.svg
			variants={hoverGlow}
			initial="rest"
			whileHover="hover"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M12 22s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
			<circle cx="12" cy="11" r="2.5" />
		</motion.svg>
	);
}

export function PhoneIcon({ className = '', size = 24, color = '#00ff00' }: IconProps) {
	return (
		<motion.svg
			variants={hoverGlow}
			initial="rest"
			whileHover="hover"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M22 16.92v2a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.92 4.18 2 2 0 014.92 2h2a2 2 0 012 1.72c.12.86.33 1.69.62 2.49a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l.68-.71a2 2 0 012.11-.45c.8.29 1.63.5 2.49.62A2 2 0 0122 16.92z" />
		</motion.svg>
	);
}

export function EmailIcon({ className = '', size = 24, color = '#ff00ff' }: IconProps) {
	return (
		<motion.svg
			variants={hoverGlow}
			initial="rest"
			whileHover="hover"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
			<path d="M3 7l9 6 9-6" />
		</motion.svg>
	);
}

export function WebsiteIcon({ className = '', size = 24, color = '#00ffff' }: IconProps) {
	return (
		<motion.svg
			variants={hoverGlow}
			initial="rest"
			whileHover="hover"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18" />
			<path d="M12 3a15.3 15.3 0 010 18" />
			<path d="M12 3a15.3 15.3 0 000 18" />
		</motion.svg>
	);
}
