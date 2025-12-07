type BookingSort = "check_in_date" | "check_out_date" | "created_at";

interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  created_at: string;
}

interface NewBooking {
  property_id: string;
  user_id?: string;
  check_in_date: string;
  check_out_date: string;
}

interface BookingListQuery {
  q?: string;
  sort_by?: BookingSort;
  offset?: number;
  limit?: number;
}


interface BookingWithRelations {
  id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  created_at: string;
  user: {
    user_id: string;
    name: string;
    email: string;
  };
  property: {
    id: string;
    name: string;
    location: string;
    price_per_night: number;
  };
}