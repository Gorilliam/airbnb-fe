class PropertyService {
  private baseUrl: string;
  private propertyUrl: string;

  constructor() {
    this.baseUrl =
      process.env.BACKEND_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "";
    this.propertyUrl = `${this.baseUrl}/properties`;
  }

  async getProperties(options: Partial<PropertyListQuery> = {}) {
    let url = `${this.propertyUrl}/`;
    if (options.offset) url += `?offset=${options.offset}`;
    return await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  async getProperty(id: string) {
    const url = `${this.propertyUrl}/${id}`;
    return await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  async createProperty(propertyData: Partial<Property>) {
    const url = `${this.propertyUrl}/`;
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(id: string, propertyData: Partial<Property>) {
    const url = `${this.propertyUrl}/${id}`;
    return await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(id: string) {
    const url = `${this.propertyUrl}/${id}`;
    return await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }
}

export default PropertyService;
