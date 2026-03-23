import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDeleteAccount } from "~/hooks/useUser";

export default function DangerZone() {
  const navigate = useNavigate();
  const deleteAccount = useDeleteAccount();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        toast.success("Account deleted");
        navigate("/");
      },
      onError: (e: any) => toast.error(e.response?.data?.message || "Failed to delete"),
    });
  };

  return (
    <div className="bg-white rounded-xl border border-red-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Trash2 size={18} className="text-red-500" />
        <h2 className="text-lg font-serif font-bold text-zinc-900">Danger zone</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-4">Permanently delete your account. This cannot be undone.</p>

      {!showConfirm ? (
        <button onClick={() => setShowConfirm(true)} className="px-4 py-2.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
          Delete account
        </button>
      ) : (
        <div className="flex flex-col gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <p className="text-sm font-medium text-red-700">Are you sure? This is permanent.</p>
          <div className="flex gap-2">
            <button onClick={handleDelete} disabled={deleteAccount.isPending} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50">
              {deleteAccount.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Yes, delete
            </button>
            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-sm font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}