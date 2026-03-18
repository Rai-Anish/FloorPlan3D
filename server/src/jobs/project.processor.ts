import { generateRender as  generateWithGemini} from "../services/gemini.service";
import { generateRender as generateWithComfyUI } from "../services/comfyui.service";
import { uploadToCloudinary } from "../utils/cloudinary";
import { prisma } from "../config/db";

export const processProject = async (
    projectId: number,
    provider: string,
    file: Express.Multer.File
) => {
    try {
        
        let imageBuffer: Buffer;
        let mimeType: string;

        if (provider === "gemini") {
            ({ imageBuffer, mimeType } = await generateWithGemini(file.buffer, file.mimetype));
        } else {
            ({ imageBuffer, mimeType } = await generateWithComfyUI(file.buffer, file.mimetype));
        }

        const imageUrl = await uploadToCloudinary(
            imageBuffer,
            mimeType,
            "roomify/renders"
        );

        // ✅ update project when done
        await prisma.project.update({
            where: { id: projectId },
            data: { imageUrl },
        });

    } catch (err) {
        console.error("❌ Processing failed:", err);

        // optional: mark as failed
        await prisma.project.update({
            where: { id: projectId },
            data: { imageUrl: "FAILED" },
        });
    }
};