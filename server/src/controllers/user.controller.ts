import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as userService from "../services/user.service.js";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const stats = await userService.getUserStats(req.user!.id);
    res.status(200).json(new ApiResponse(200, { user: req.user, stats }, "Profile fetched"));
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.updateProfile(req.user!.id, req.body, req.file);
    res.status(200).json(new ApiResponse(200, { user }, "Profile updated successfully"));
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    await userService.changePassword(req.user!.id, req.body);
    res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    await userService.deleteAccount(req.user!.id);
    res.clearCookie("refreshToken");
    res.status(200).json(new ApiResponse(200, {}, "Account deleted successfully"));
});