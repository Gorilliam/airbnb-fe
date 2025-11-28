class BookingService {
  private baseUrl: string;
  private bookingUrl: string;

  constructor() {
    this.baseUrl =
      process.env.BACKEND_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "";
    this.bookingUrl = `${this.baseUrl}/bookings`;
  }

  async getBookings(options: Partial<BookingListQuery> = {}) {
    let url = `${this.bookingUrl}/`;
    if (options.offset) url += `?offset=${options.offset}`;
    return await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }

  async getBooking(id: string) {
    const url = `${this.bookingUrl}/${id}`;
    return await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }

  async createBooking(bookingData: Partial<Booking>) {
    const url = `${this.bookingUrl}/`;
    console.log("POST URL:", url);
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bookingData),
    });
  }

  async updateBooking(id: string, bookingData: Partial<Booking>) {
    const url = `${this.bookingUrl}/${id}`;
    return await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bookingData),
    });
  }

  async deleteBooking(id: string) {
    const url = `${this.bookingUrl}/${id}`;
    return await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }
}

export default BookingService;