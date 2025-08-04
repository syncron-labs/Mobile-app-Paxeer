import React, { useState, useEffect } from "react";
import { AppRelease } from "@/entities/AppRelease";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Save,
  X,
  ExternalLink,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function AdminPage() {
  const [releases, setReleases] = useState([]);
  const [editingRelease, setEditingRelease] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadReleases();
  }, []);

  const loadReleases = async () => {
    setIsLoading(true);
    const data = await AppRelease.list("-created_date");
    setReleases(data);
    setIsLoading(false);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (editingRelease) {
        await AppRelease.update(editingRelease.id, formData);
      } else {
        await AppRelease.create(formData);
      }
      await loadReleases();
      setShowForm(false);
      setEditingRelease(null);
    } catch (error) {
      console.error("Error saving release:", error);
    }
    setSaving(false);
  };

  const handleEdit = (release) => {
    setEditingRelease(release);
    setShowForm(true);
  };

  const handleDelete = async (releaseId) => {
    if (window.confirm("Are you sure you want to delete this release?")) {
      await AppRelease.delete(releaseId);
      await loadReleases();
    }
  };

  const toggleActive = async (release) => {
    await AppRelease.update(release.id, {
      ...release,
      is_active: !release.is_active
    });
    await loadReleases();
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Release Management</h1>
          <p className="text-gray-400">Manage Paxeer app releases and GitHub distribution</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#35b7ff] to-[#35b7ff]/80 hover:from-[#35b7ff]/90 hover:to-[#35b7ff]/70 text-white shadow-lg w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Release
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <ReleaseForm
            release={editingRelease}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingRelease(null);
            }}
            saving={saving}
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse bg-black/60 border-gray-800">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-800 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-800 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-800 rounded-lg w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {releases.map((release) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <Card className={`bg-black/60 backdrop-blur-xl border-gray-800 shadow-lg transition-all duration-200 ${
                  !release.is_active ? 'opacity-60' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-xl font-bold text-white">
                            {release.app_name}
                          </h3>
                          <Badge variant="outline" className="text-sm border-[#35b7ff] text-[#35b7ff] bg-[#35b7ff]/10">
                            v{release.version}
                          </Badge>
                          <Badge className={release.is_active ? 'bg-[#74f05a] text-black' : 'bg-gray-600'}>
                            {release.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Download className="w-4 h-4" />
                            <span className="text-sm">
                              {(release.download_count || 0).toLocaleString()} downloads
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Smartphone className="w-4 h-4" />
                            <span className="text-sm">
                              Android {release.minimum_android_version || "7.0+"}
                            </span>
                          </div>
                          <div className="text-gray-400 text-sm">
                            {format(new Date(release.created_date), "MMM d, yyyy")}
                          </div>
                        </div>

                        {release.release_notes && (
                          <p className="text-gray-300 text-sm mb-4 bg-gray-900/50 border border-gray-800 p-3 rounded-lg">
                            {release.release_notes}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <ExternalLink className="w-4 h-4" />
                          <a
                            href={release.github_release_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#35b7ff] transition-colors truncate max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
                          >
                            {release.github_release_url}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Switch
                          checked={release.is_active}
                          onCheckedChange={() => toggleActive(release)}
                          className="data-[state=checked]:bg-[#35b7ff]"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(release)}
                          className="border-gray-700 hover:bg-[#35b7ff]/10 text-gray-300 hover:text-[#35b7ff] hover:border-[#35b7ff]/50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(release.id)}
                          className="border-red-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {releases.length === 0 && (
            <Card className="bg-black/60 backdrop-blur-xl border-gray-800 shadow-lg">
              <CardContent className="p-8 md:p-12 text-center">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f6aaf8462_512x512_App_Icon.png" 
                  alt="Paxeer" 
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl opacity-50"
                />
                <h3 className="text-xl font-bold text-white mb-2">No Releases Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first Paxeer app release to start distribution.
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-[#35b7ff] to-[#35b7ff]/80 hover:from-[#35b7ff]/90 hover:to-[#35b7ff]/70 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Release
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function ReleaseForm({ release, onSubmit, onCancel, saving }) {
  const [formData, setFormData] = useState(release || {
    app_name: "Paxeer",
    version: "",
    github_release_url: "",
    release_notes: "",
    file_size: "",
    minimum_android_version: "7.0+",
    is_active: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-8"
    >
      <Card className="bg-black/80 backdrop-blur-xl border-gray-800 shadow-2xl">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="flex items-center justify-between text-white">
            <span>{release ? 'Edit Release' : 'Add New Release'}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="hover:bg-gray-800 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="app_name" className="text-gray-300">App Name *</Label>
                <Input
                  id="app_name"
                  value={formData.app_name}
                  onChange={(e) => setFormData({...formData, app_name: e.target.value})}
                  placeholder="Paxeer"
                  required
                  className="bg-gray-900/50 border-gray-700 focus:border-[#35b7ff] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version" className="text-gray-300">Version *</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="1.0.0"
                  required
                  className="bg-gray-900/50 border-gray-700 focus:border-[#35b7ff] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_release_url" className="text-gray-300">GitHub Release URL *</Label>
              <Input
                id="github_release_url"
                type="url"
                value={formData.github_release_url}
                onChange={(e) => setFormData({...formData, github_release_url: e.target.value})}
                placeholder="https://github.com/paxeer/mobile-app/releases/download/v1.0.0/paxeer.apk"
                required
                className="bg-gray-900/50 border-gray-700 focus:border-[#35b7ff] text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="file_size" className="text-gray-300">File Size</Label>
                <Input
                  id="file_size"
                  value={formData.file_size}
                  onChange={(e) => setFormData({...formData, file_size: e.target.value})}
                  placeholder="25.4 MB"
                  className="bg-gray-900/50 border-gray-700 focus:border-[#35b7ff] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimum_android_version" className="text-gray-300">Min. Android Version</Label>
                <Input
                  id="minimum_android_version"
                  value={formData.minimum_android_version}
                  onChange={(e) => setFormData({...formData, minimum_android_version: e.target.value})}
                  placeholder="7.0+"
                  className="bg-gray-900/50 border-gray-700 focus:border-[#35b7ff] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="release_notes" className="text-gray-300">Release Notes</Label>
              <Textarea
                id="release_notes"
                value={formData.release_notes}
                onChange={(e) => setFormData({...formData, release_notes: e.target.value})}
                placeholder="• Enhanced trading algorithms&#10;• New portfolio analytics&#10;• Improved security features"
                rows={4}
                className="bg-gray-900/50 border-gray-700 focus:border-[#35b7ff] text-white resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                className="data-[state=checked]:bg-[#35b7ff]"
              />
              <Label htmlFor="is_active" className="text-gray-300">Make this release available for download</Label>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={saving}
                className="border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-[#35b7ff] to-[#35b7ff]/80 hover:from-[#35b7ff]/90 hover:to-[#35b7ff]/70 text-white"
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {release ? 'Update Release' : 'Create Release'}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}