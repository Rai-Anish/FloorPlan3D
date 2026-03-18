import React from "react";
import { useParams } from "react-router";
import { useProject } from "~/hooks/useProject";

const VisualizerId = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const { data: project, isLoading, refetch } = useProject(projectId);

  // Polling every 2s if image is not yet generated
  React.useEffect(() => {
    if (project && !project.imageUrl) {
      const interval = setInterval(() => {
        refetch();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [project, refetch]);

  if (isLoading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;

  const isProcessing = !project.imageUrl;
  const isFailed = project.imageUrl === "FAILED";

  return (
    <section>
      <h1>{project.title || "Untitled Project"}</h1>

      <div className="visualizer">
        <div className="image-container">
          {/* Original image always visible */}
          <h2>Source Image</h2>
          <img
            src={project.originalImageUrl || ''}
            className={isProcessing ? "blur-md opacity-70" : ""}
            alt="Original Floorplan"
          />

          {/* Loading state */}
          {isProcessing && (
            <p style={{ marginTop: "10px" }}>⏳ Generating your design...</p>
          )}

          {/* Failed */}
          {isFailed && (
            <p style={{ color: "red" }}>❌ Generation failed. Try again.</p>
          )}

          {/* Final image */}
          {project.imageUrl && project.imageUrl !== "FAILED" && (
            <>
              <h2>Generated Design</h2>
              <img src={project.imageUrl} alt="Generated Render" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VisualizerId;