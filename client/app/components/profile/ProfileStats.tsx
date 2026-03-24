import { FolderOpen, Globe } from "lucide-react";

interface StatsProps {
  stats?: {
    totalProjects: number;
    communityProjects: number;
  };
}

export default function ProfileStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <FolderOpen size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-zinc-500">Total Projects</span>
        </div>
        <p className="text-3xl font-serif font-bold text-zinc-900">
          {stats?.totalProjects ?? 0}
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe size={16} className="text-blue-500" />
          </div>
          <span className="text-sm font-medium text-zinc-500">Community</span>
        </div>
        <p className="text-3xl font-serif font-bold text-zinc-900">
          {stats?.communityProjects ?? 0}
        </p>
      </div>
    </div>
  );
}