import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useChangePassword } from "~/hooks/useUser";

export default function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) return toast.error("Passwords don't match");
    
    changePassword.mutate({ currentPassword, newPassword }, {
      onSuccess: () => {
        toast.success("Password updated");
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      },
      onError: (e: any) => toast.error(e.response?.data?.message || "Error"),
    });
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <KeyRound size={18} className="text-zinc-400" />
        <h2 className="text-lg font-serif font-bold text-zinc-900">Change password</h2>
      </div>
      <div className="flex flex-col gap-4">
        <input type="password" placeholder="Current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm outline-none" />
        <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm outline-none" />
        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm outline-none" />
        
        <button onClick={handlePasswordChange} disabled={changePassword.isPending || !newPassword} className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 disabled:opacity-50 w-fit">
          {changePassword.isPending ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
          Update password
        </button>
      </div>
    </div>
  );
}