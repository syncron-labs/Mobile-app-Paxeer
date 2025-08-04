import React, { useState, useEffect } from "react";
import { AppRelease } from "@/entities/AppRelease";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Smartphone, 
  Shield, 
  Clock,
  HardDrive,
  ChevronDown,
  ExternalLink,
  TrendingUp,
  Zap,
  Star,
  Github
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function DownloadPage() {
  const [releases, setReleases] = useState([]);
  const [currentRelease, setCurrentRelease] = useState(null);
  const [showAllVersions, setShowAllVersions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadReleases();
  }, []);

  const loadReleases = async () => {
    setIsLoading(true);
    const data = await AppRelease.filter({ is_active: true }, "-created_date");
    setReleases(data);
    setCurrentRelease(data[0] || null);
    setIsLoading(false);
  };

  const handleDownload = async (release) => {
    setDownloading(true);
    try {
      await AppRelease.update(release.id, {
        ...release,
        download_count: (release.download_count || 0) + 1
      });
      
      window.open(release.github_release_url, '_blank');
      
      setReleases(prev => prev.map(r => 
        r.id === release.id 
          ? { ...r, download_count: (r.download_count || 0) + 1 }
          : r
      ));
      
      if (currentRelease?.id === release.id) {
        setCurrentRelease({ ...release, download_count: (release.download_count || 0) + 1 });
      }
    } catch (error) {
      console.error("Download error:", error);
    }
    setDownloading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-[#35b7ff] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading Paxeer app...</p>
        </div>
      </div>
    );
  }

  if (!currentRelease) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-black/80 backdrop-blur-xl border-gray-800 shadow-2xl">
          <CardContent className="p-8 text-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f6aaf8462_512x512_App_Icon.png" 
              alt="Paxeer" 
              className="w-16 h-16 mx-auto mb-4 rounded-2xl opacity-50"
            />
            <h2 className="text-2xl font-bold text-white mb-2">App Coming Soon</h2>
            <p className="text-gray-400">
              The Paxeer mobile app is not currently available. Check back soon for updates.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="relative mb-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f6aaf8462_512x512_App_Icon.png" 
              alt="Paxeer" 
              className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-3xl paxeer-glow mb-4"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#35b7ff]/20 to-[#74f05a]/20 rounded-full blur-xl"></div>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-[#35b7ff] to-[#74f05a] bg-clip-text text-transparent">
              Paxeer
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Advanced crypto trading on the go. Download the mobile app for professional-grade trading features.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gradient-to-r from-[#35b7ff]/10 to-transparent border border-[#35b7ff]/20 rounded-2xl p-4 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-[#35b7ff] mb-2" />
            <h3 className="text-white font-semibold mb-1">Advanced Trading</h3>
            <p className="text-gray-400 text-sm">Professional charts & analytics</p>
          </div>
          <div className="bg-gradient-to-r from-[#74f05a]/10 to-transparent border border-[#74f05a]/20 rounded-2xl p-4 backdrop-blur-sm">
            <Zap className="w-8 h-8 text-[#74f05a] mb-2" />
            <h3 className="text-white font-semibold mb-1">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Execute trades in milliseconds</p>
          </div>
          <div className="bg-gradient-to-r from-[#35b7ff]/10 to-transparent border border-[#35b7ff]/20 rounded-2xl p-4 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-[#35b7ff] mb-2" />
            <h3 className="text-white font-semibold mb-1">Bank-Grade Security</h3>
            <p className="text-gray-400 text-sm">Your assets are protected</p>
          </div>
        </motion.div>

        {/* Main Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-black/60 backdrop-blur-xl border-gray-800 shadow-2xl mb-8 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                <div className="flex-1 space-y-6 w-full">
                  <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                    <Badge className="bg-gradient-to-r from-[#74f05a] to-[#74f05a]/80 text-black px-4 py-2 text-sm font-bold">
                      Latest Version
                    </Badge>
                    <Badge variant="outline" className="border-[#35b7ff] text-[#35b7ff] px-3 py-1 bg-[#35b7ff]/10">
                      v{currentRelease.version}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {(currentRelease.download_count || 0).toLocaleString()} downloads
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-300">
                      <HardDrive className="w-5 h-5 text-[#35b7ff] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Size</p>
                        <p className="text-xs text-gray-400">{currentRelease.file_size || "25 MB"}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-300">
                      <Smartphone className="w-5 h-5 text-[#74f05a] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Android</p>
                        <p className="text-xs text-gray-400">{currentRelease.minimum_android_version || "7.0+"}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5 text-[#35b7ff] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Updated</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(currentRelease.created_date), "MMM d")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {currentRelease.release_notes && (
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                      <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#74f05a]" />
                        What's New
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {currentRelease.release_notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-80 space-y-4">
                  <Button
                    onClick={() => handleDownload(currentRelease)}
                    disabled={downloading}
                    className="w-full bg-gradient-to-r from-[#35b7ff] to-[#35b7ff]/80 hover:from-[#35b7ff]/90 hover:to-[#35b7ff]/70 text-white px-6 py-4 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 paxeer-glow"
                  >
                    {downloading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Downloading...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Download APK
                      </div>
                    )}
                  </Button>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm justify-center lg:justify-start">
                      <Shield className="w-4 h-4 text-[#74f05a]" />
                      <span>Secure Download</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm justify-center lg:justify-start">
                      <Github className="w-4 h-4 text-[#35b7ff]" />
                      <span>GitHub Releases</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Version History */}
        {releases.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border-gray-800 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">Version History</h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowAllVersions(!showAllVersions)}
                    className="border-gray-700 hover:bg-[#35b7ff]/10 text-gray-300 hover:text-[#35b7ff] hover:border-[#35b7ff]/50"
                  >
                    <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showAllVersions ? 'rotate-180' : ''}`} />
                    {showAllVersions ? 'Show Less' : 'Show All'}
                  </Button>
                </div>

                <AnimatePresence>
                  <div className="space-y-4">
                    {(showAllVersions ? releases : releases.slice(0, 3)).map((release, index) => (
                      <motion.div
                        key={release.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 gap-4 ${
                          release.id === currentRelease?.id
                            ? 'bg-[#35b7ff]/10 border-[#35b7ff]/30'
                            : 'bg-gray-900/30 border-gray-800 hover:bg-gray-900/50'
                        }`}
                      >
                        <div className="flex-1 w-full">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              v{release.version}
                            </Badge>
                            {index === 0 && (
                              <Badge className="bg-[#74f05a] text-black text-xs font-bold">Latest</Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {format(new Date(release.created_date), "MMM d, yyyy")}
                            </span>
                          </div>
                          {release.release_notes && (
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {release.release_notes}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(release)}
                          disabled={downloading}
                          className="border-gray-700 hover:bg-[#35b7ff]/10 text-gray-300 hover:text-[#35b7ff] hover:border-[#35b7ff]/50 flex-shrink-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}