'use client';

import React, { useState, useRef } from 'react';

type RippleButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
};

type Ripple = {
  x: number;
  y: number;
  size: number;
  id: number;
};

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  variant = 'primary',
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, size, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    // Call original onClick
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={createRipple}
      disabled={disabled}
      className={`relative overflow-hidden ${baseStyles} ${className}`}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
