class AuthService {
  private baseUrl: string;
  private authUrl: string;

  constructor() {
    this.baseUrl =
      process.env.BACKEND_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "";
    this.authUrl = `${this.baseUrl}/auth`;
  }

  async login(email: string, password: string) {
    const url = `${this.authUrl}/login`;
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    const url = `${this.authUrl}/register`;
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getUserProfile() {
    const url = `${this.authUrl}/me`;
    return await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }

  async logout() {
    const url = `${this.authUrl}/logout`;
    return await fetch(url, {
      method: "POST",
      credentials: "include",
    });
  }
}

export default AuthService;
