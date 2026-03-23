import Skeleton from "~/components/ui/Skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
      {/* Image Preview Area */}
      <div className="relative aspect-[4/3] w-full">
        <Skeleton className="h-full w-full rounded-none" />
        
        {/* Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex justify-between items-start">
        <div className="space-y-3 w-full">
          {/* Title Skeleton */}
          <Skeleton className="h-5 w-3/4" />
          
          {/* Meta Info (Date & Author) */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" /> {/* Clock icon placeholder */}
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* Arrow Icon Placeholder */}
        <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
      </div>
    </div>
  );
};