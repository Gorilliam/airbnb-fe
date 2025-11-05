type UserRole = "guest" | "host" | "admin";

interface UserProfile {
  user_id: string;
  name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
}

