type PropertySort = "name" | "price_per_night" | "created_at";

interface Property {
  id: string;
  user_id: string;
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  availability: boolean;
  created_at: string;
}

interface NewProperty {
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  availability?: boolean;
}

interface PropertyListQuery {
  q?: string;
  sort_by?: PropertySort;
  offset?: number;
  limit?: number;
}
