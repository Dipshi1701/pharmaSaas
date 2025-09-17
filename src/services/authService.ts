export type AuthRole = "frontend" | "backend";

export type LoginResponse = {
  token: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function login(
  username: string,
  password: string,
  selectedRole?: AuthRole
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: username, password, role: selectedRole }),
  });
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  const data = (await response.json()) as { token?: string };
  if (!data?.token) {
    throw new Error("Malformed response");
  }
  
  return { token: data.token };
}

/**
 * Logout function - destroys chatbot and clears auth
 */
export function logout(): void {
  try {
    // Chatbot is loaded directly from index.html
    
    // Clear auth data
    localStorage.removeItem('pharmaSaas:auth');
    sessionStorage.clear();
    
    console.log('✅ User logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
  }
}

// Default export for the service
const authService = {
  login,
  logout
};

export default authService;
