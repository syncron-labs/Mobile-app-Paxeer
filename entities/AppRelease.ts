export interface AppReleaseData {
  id?: string;
  app_name: string;
  version: string;
  github_release_url: string;
  release_notes?: string;
  file_size?: string;
  minimum_android_version?: string;
  is_active: boolean;
  download_count: number;
  created_date?: string;
}

// Mock API service for the AppRelease entity
export class AppRelease {
  static async filter(query: Partial<AppReleaseData>, sort?: string): Promise<AppReleaseData[]> {
    // Mock data
    const mockReleases: AppReleaseData[] = [
      {
        id: "1",
        app_name: "Paxeer",
        version: "1.0.0",
        github_release_url: "https://github.com/syncron-labs/Mobile-app-Paxeer/releases/download/v1.0.0/app-release.apk",
        release_notes: "Added advanced charting and portfolio tracking features.",
        file_size: "49.8 MB",
        minimum_android_version: "7.0",
        is_active: true,
        download_count: 875,
        created_date: "2023-09-15T00:00:00.000Z"
      }
    ];

    // Filter based on query params
    let filteredReleases = mockReleases.filter(release => {
      let matches = true;
      for (const [key, value] of Object.entries(query)) {
        if (release[key as keyof AppReleaseData] !== value) {
          matches = false;
          break;
        }
      }
      return matches;
    });

    // Sort if needed
    if (sort) {
      const isDesc = sort.startsWith("-");
      const sortField = isDesc ? sort.substring(1) : sort;
      
      filteredReleases.sort((a, b) => {
        const aValue = a[sortField as keyof AppReleaseData];
        const bValue = b[sortField as keyof AppReleaseData];
        
        if (isDesc) {
          if (aValue < bValue) return 1;
          if (aValue > bValue) return -1;
        } else {
        }
        return 0;
      });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return filteredReleases;
  }

  static async update(id: string, data: Partial<AppReleaseData>): Promise<AppReleaseData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would update the database
    return {
      id,
      ...data
    } as AppReleaseData;
  }

}

