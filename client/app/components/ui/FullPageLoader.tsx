import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

export default function FullPageLoader({ className, label }: { className?: string, label?: string }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen bg-background",
      className 
    )}>
      <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      {label && <p className="mt-2 text-zinc-500">{label}</p>}
    </div>
  );
}