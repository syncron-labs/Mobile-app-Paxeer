import React, { useState, useEffect } from "react";
import { AppRelease } from "@/entities/AppRelease";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  TrendingUp, 
  Calendar,
  Smartphone,
  BarChart3,
  Users
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";

const COLORS = ['#35b7ff', '#74f05a', '#ffffff', '#35b7ff80', '#74f05a80', '#ffffff80'];

export default function AnalyticsPage() {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDownloads, setTotalDownloads] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    const data = await AppRelease.list("-created_date");
    setReleases(data);
    setTotalDownloads(data.reduce((sum, release) => sum + (release.download_count || 0), 0));
    setIsLoading(false);
  };

  const getDownloadData = () => {
    return releases.map(release => ({
      version: `v${release.version}`,
      downloads: release.download_count || 0,
      name: release.app_name
    })).sort((a, b) => b.downloads - a.downloads);
  };

  const getActiveReleases = () => {
    return releases.filter(release => release.is_active).length;
  };

  const getLatestRelease = () => {
    return releases[0];
  };

  const getVersionDistribution = () => {
    const activeReleases = releases.filter(r => r.is_active);
    return activeReleases.map((release, index) => ({
      name: `v${release.version}`,
      value: release.download_count || 0,
      color: COLORS[index % COLORS.length]
    }));
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse bg-black/60 border-gray-800">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-800 rounded-lg"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const latestRelease = getLatestRelease();
  const downloadData = getDownloadData();
  const versionDistribution = getVersionDistribution();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Track Paxeer app performance and user engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="bg-gradient-to-r from-[#35b7ff] to-[#35b7ff]/80 text-white border-none shadow-xl">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Downloads</p>
                <p className="text-2xl md:text-3xl font-bold">{totalDownloads.toLocaleString()}</p>
              </div>
              <Download className="w-6 h-6 md:w-8 md:h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#74f05a] to-[#74f05a]/80 text-black border-none shadow-xl">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm font-medium">Active Releases</p>
                <p className="text-2xl md:text-3xl font-bold">{getActiveReleases()}</p>
              </div>
              <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-black/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-800 to-gray-700 text-white border-none shadow-xl">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Total Releases</p>
                <p className="text-2xl md:text-3xl font-bold">{releases.length}</p>
              </div>
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#35b7ff]/20 to-[#74f05a]/20 border border-[#35b7ff]/30 text-white shadow-xl backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Latest Version</p>
                <p className="text-xl md:text-2xl font-bold">
                  {latestRelease ? `v${latestRelease.version}` : 'N/A'}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#35b7ff]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* Downloads by Version */}
        <Card className="bg-black/60 backdrop-blur-xl border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="w-5 h-5 text-[#35b7ff]" />
              Downloads by Version
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={downloadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="version" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid #35b7ff',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="downloads" 
                    fill="#35b7ff"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Version Distribution */}
        <Card className="bg-black/60 backdrop-blur-xl border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-[#74f05a]" />
              Version Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={versionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {versionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid #35b7ff',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {versionDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Release Performance */}
      <Card className="bg-black/60 backdrop-blur-xl border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-[#35b7ff]" />
            Release Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {releases.slice(0, 5).map((release, index) => (
              <div key={release.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-xl gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    ['bg-[#35b7ff]', 'bg-[#74f05a] text-black', 'bg-gray-600', 'bg-[#35b7ff]/70', 'bg-[#74f05a]/70'][index]
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {release.app_name} v{release.version}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Released {format(new Date(release.created_date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="font-bold text-white">
                      {(release.download_count || 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">downloads</p>
                  </div>
                  <Badge className={release.is_active ? 'bg-[#74f05a] text-black' : 'bg-gray-600'}>
                    {release.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}