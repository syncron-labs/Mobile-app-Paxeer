import React, { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-[#35b7ff] text-white hover:bg-[#35b7ff]/90',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    }

    const sizeClasses = {
      default: 'px-4 py-2',
      sm: 'px-3 py-1 text-sm',
      lg: 'px-5 py-3 text-lg'
    }

    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)