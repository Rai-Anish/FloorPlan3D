import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { UpdateProfileInput, ChangePasswordInput } from "../types/user.types.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";

export const getUserStats = async (userId: number) => {
    const [totalProjects, communityProjects] = await Promise.all([
        prisma.project.count({ where: { userId } }),
        prisma.project.count({ where: { userId, visibility: "COMMUNITY" } }),
    ]);

    return { totalProjects, communityProjects };
};

export const updateProfile = async (
    userId: number,
    input: UpdateProfileInput,
    file?: Express.Multer.File
) => {
    if (input.username) {
        const existing = await prisma.user.findFirst({
            where: { username: input.username, NOT: { id: userId } }
        });
        if (existing) throw new ApiError(409, "Username already taken");
    }

    let avatar: string | undefined;
    if (file) {
        avatar = await uploadToCloudinary(file.buffer, file.mimetype, "roomify/avatars");
    }

    return prisma.user.update({
        where: { id: userId },
        data: {
            ...(input.username && { username: input.username }),
            ...(avatar && { avatar }),
        },
        select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
            isVerified: true,
            createdAt: true,
        }
    });
};

export const changePassword = async (userId: number, input: ChangePasswordInput) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) throw new ApiError(400, "No password set on this account");

    const isValid = await bcrypt.compare(input.currentPassword, user.password);
    if (!isValid) throw new ApiError(401, "Current password is incorrect");

    const hashed = await bcrypt.hash(input.newPassword, 12);
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashed }
    });
};

export const deleteAccount = async (userId: number) => {
    await prisma.user.delete({ where: { id: userId } });
};