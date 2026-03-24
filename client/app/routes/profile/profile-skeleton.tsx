import Skeleton from "~/components/ui/Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6">
          <div className="flex items-center gap-5">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}