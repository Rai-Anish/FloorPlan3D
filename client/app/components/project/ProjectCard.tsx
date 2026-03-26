import { ArrowUpRight, Clock, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useDeleteProject } from "~/hooks/useProject";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmModal } from "../ui/ConfirmModal";

interface Project {
    id: number;
    title: string;
    imageUrl: string | null;
    originalImageUrl: string | null;
    visibility: "PRIVATE" | "COMMUNITY";
    createdAt: string;
    user: {
        username: string;
        avatar: string | null;
    };
}

interface ProjectCardProps {
    project: Project;
    showAuthor?: boolean;
    showDelete?: boolean;
}

export const ProjectCard = ({ project, showAuthor = true, showDelete = false }: ProjectCardProps) => {
    const navigate = useNavigate();
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteProject(project.id, {
            onSuccess: () => {
                toast.success("Project deleted successfully");
                setIsModalOpen(false);
            },
            onError: () => toast.error("Failed to delete project")
        });
    };

    return (
        <>
        <div
            className="project-card group"
            onClick={() => navigate(`/visualize/${project.id}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="preview relative">
                <img
                    src={project.imageUrl || project.originalImageUrl || ''}
                    alt={project.title}
                />
                <div className="badge">
                    <span>{project.visibility}</span>
                </div>
                {showDelete && (
                    <button 
                        className="absolute top-3 right-3 p-2 bg-red-600/90 hover:bg-red-700 text-white rounded-full transition-colors backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        onClick={handleDeleteClick}
                        disabled={isDeleting || isModalOpen}
                        title="Delete project"
                    >
                        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                )}
            </div>
            <div className="card-body">
                <div>
                    <h3>{project.title}</h3>
                    <div className="meta">
                        <Clock size={12} />
                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                        {showAuthor && <span>By {project.user.username}</span>}
                    </div>
                </div>
                <div className="arrow">
                    <ArrowUpRight size={18} />
                </div>
            </div>
        </div>
        <ConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Project"
            description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
            confirmText="Delete"
            isPending={isDeleting}
        />
        </>
    );
};