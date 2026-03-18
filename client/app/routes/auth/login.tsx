import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/useAuth.js";

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useLogin();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // The logic for storing the user is inside useLogin's onSuccess
        login.mutate(
            { email, password },
            {
                onSuccess: () => {
                    // This only runs if the backend verified the credentials
                    navigate("/"); 
                },
                onError: (error: any) => {
                    // This runs if the email/password was wrong
                    console.error(error.response?.data?.message || "Invalid credentials");
                },
            }
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Login to Roomify</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    className="border p-2 rounded"
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    className="border p-2 rounded"
                />
                
                <button 
                    type="submit" 
                    disabled={login.isPending}
                    className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
                >
                    {login.isPending ? "Authenticating..." : "Login"}
                </button>

                {/* Show server-side error messages (e.g., "Invalid Password") */}
                {login.isError && (
                    <p className="text-red-500 text-sm text-center">
                        {(login.error as any).response?.data?.message || "Something went wrong"}
                    </p>
                )}
            </form>
        </div>
    );
}