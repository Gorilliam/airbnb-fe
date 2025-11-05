"use client";

import { useState } from "react";
import PropertyService from "@/utils/propertyService";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number>(0);
  const router = useRouter();

  async function handleSubmit() {
    const response = await new PropertyService().createProperty({
      name,
      description,
      location,
      price_per_night: price,
      availability: true,
    });

    if (response.ok) {
      router.push("/properties");
    } else {
      alert("Failed to create property");
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>

      <div className="space-y-2">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Price per night"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
