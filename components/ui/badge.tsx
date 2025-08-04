import React from 'react'

interface BadgeProps {
  variant?: 'default' | 'outline'
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#35b7ff] text-white',
    outline: 'border border-gray-300 text-gray-700'
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${variantClasses[variant]} ${className || ''}`}>
      {children}
    </span>
  )
}