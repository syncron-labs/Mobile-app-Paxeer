import React, { createContext, useState, useContext, ReactNode } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function Sidebar({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { isOpen } = useSidebar();
  
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${className}`}>
      {children}
    </div>
  );
}

export function SidebarTrigger({ className = "" }: { className?: string }) {
  const { toggle } = useSidebar();
  
  return (
    <button onClick={toggle} className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

export function SidebarHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SidebarContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

export function SidebarGroupLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroupContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SidebarMenu({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <nav className={className}>{children}</nav>;
}

export function SidebarMenuItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SidebarMenuButton({ children, className = "", asChild = false }: { children: ReactNode; className?: string; asChild?: boolean }) {
  if (asChild) return <div className={className}>{children}</div>;
  return <button className={className}>{children}</button>;
}