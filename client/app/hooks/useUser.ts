import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "~/lib/axios";
import { useAuthStore } from "~/store/authStore";
import type { ApiResponse, User } from "~/types/index";

interface Stats {
    totalProjects: number;
    communityProjects: number;
}

export const useProfile = () => {

    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosInstance.get<ApiResponse<{ user: User; stats: Stats }>>(
                "/user/me"
            );
            return res.data.data;
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await axiosInstance.put<ApiResponse<{ user: User }>>(
                "/user/me",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return res.data.data.user;
        },
        onSuccess: (user) => {
            setUser(user);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
            const res = await axiosInstance.put("/user/me/password", data);
            return res.data;
        },
    });
};

export const useDeleteAccount = () => {
    const logout = useAuthStore((state) => state.logout);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.delete("/user/me");
            return res.data;
        },
        onSuccess: () => {
            logout();
            queryClient.clear();
        },
    });
};