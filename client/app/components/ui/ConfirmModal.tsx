import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: ReactNode;
    confirmText?: string;
    cancelText?: string;
    isPending?: boolean;
}

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isPending = false
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
            <div 
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm mb-6">{description}</p>
                
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        disabled={isPending}
                        className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onConfirm(); }}
                        disabled={isPending}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-red-900/20"
                    >
                        {isPending && <Loader2 size={16} className="animate-spin" />}
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
