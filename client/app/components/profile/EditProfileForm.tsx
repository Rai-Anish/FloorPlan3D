import { useState, useRef, useEffect } from "react";
import { Camera, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateProfile } from "~/hooks/useUser";

export default function EditProfileForm({ currentUser }: { currentUser: any }) {
  const updateProfile = useUpdateProfile();
  const fileRef = useRef<HTMLInputElement>(null);
  
  const [username, setUsername] = useState(currentUser?.username || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentUser?.username) setUsername(currentUser.username);
  }, [currentUser]);

  useEffect(() => {
    return () => { if (avatarPreview) URL.revokeObjectURL(avatarPreview); };
  }, [avatarPreview]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const formData = new FormData();
    if (username !== currentUser?.username) formData.append("username", username);
    if (avatarFile) formData.append("avatar", avatarFile);

    if (!formData.has("username") && !formData.has("avatar")) return;

    updateProfile.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated");
        setAvatarFile(null);
        setAvatarPreview(null);
      },
      onError: (e: any) => toast.error(e.response?.data?.message || "Failed to update"),
    });
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
      <h2 className="text-lg font-serif font-bold text-zinc-900 mb-5">Edit profile</h2>
      
      <div className="flex items-center gap-5 mb-6">
        <div className="relative">
          {avatarPreview || currentUser?.avatar ? (
            <img src={avatarPreview ?? currentUser?.avatar} className="w-16 h-16 rounded-full object-cover ring-2 ring-zinc-100" alt="Avatar" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-zinc-100">
              <span className="text-primary text-xl font-bold uppercase">{currentUser?.username?.charAt(0)}</span>
            </div>
          )}
          <button onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-md">
            <Camera size={12} className="text-zinc-600" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900">{currentUser?.username}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{currentUser?.email}</p>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
      </div>

      <button onClick={handleSave} disabled={updateProfile.isPending} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors">
        {updateProfile.isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
        Save changes
      </button>
    </div>
  );
}