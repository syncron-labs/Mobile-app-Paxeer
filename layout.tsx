import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Download, Settings, BarChart3, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Download App",
    url: createPageUrl("Download"),
    icon: Download,
    public: true
  },
  {
    title: "Admin Dashboard",
    url: createPageUrl("Admin"),
    icon: Settings,
    public: false
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: BarChart3,
    public: false
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const isPublicPage = currentPageName === "Download";

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <style jsx>{`
          :root {
            --paxeer-blue: #35b7ff;
            --paxeer-green: #74f05a;
            --paxeer-black: #000000;
            --paxeer-white: #ffffff;
            --glass-bg: rgba(53, 183, 255, 0.1);
            --glass-border: rgba(53, 183, 255, 0.2);
          }
          .paxeer-glow {
            box-shadow: 0 0 30px rgba(53, 183, 255, 0.3);
          }
          .crypto-grid {
            background-image: 
              linear-gradient(rgba(53, 183, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(53, 183, 255, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}</style>
        <div className="crypto-grid min-h-screen">
          {children}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-black via-gray-900 to-black">
        <style jsx>{`
          :root {
            --paxeer-blue: #35b7ff;
            --paxeer-green: #74f05a;
            --paxeer-black: #000000;
            --paxeer-white: #ffffff;
            --glass-bg: rgba(53, 183, 255, 0.1);
            --glass-border: rgba(53, 183, 255, 0.2);
          }
          .paxeer-glow {
            box-shadow: 0 0 30px rgba(53, 183, 255, 0.3);
          }
        `}</style>
        
        <Sidebar className="border-r border-gray-800 bg-black/50 backdrop-blur-xl">
          <SidebarHeader className="border-b border-gray-800 p-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f6aaf8462_512x512_App_Icon.png" 
                alt="Paxeer" 
                className="w-10 h-10 rounded-xl paxeer-glow"
              />
              <div>
                <h2 className="font-bold text-white text-lg">Paxeer</h2>
                <p className="text-xs text-gray-400">Crypto Exchange Portal</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-[#35b7ff]/20 hover:text-[#35b7ff] transition-all duration-300 rounded-xl ${
                          location.pathname === item.url 
                            ? 'bg-[#35b7ff]/20 text-[#35b7ff] shadow-lg border border-[#35b7ff]/30' 
                            : 'text-gray-300 hover:border-[#35b7ff]/20 border border-transparent'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-black/50 backdrop-blur-lg border-b border-gray-800 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-[#35b7ff]/20 p-2 rounded-xl transition-colors duration-200 text-white" />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f6aaf8462_512x512_App_Icon.png" 
                alt="Paxeer" 
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-xl font-bold text-white">Paxeer</h1>
            </div>
          </header>

          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}