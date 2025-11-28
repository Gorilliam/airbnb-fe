"use client";

import { useState } from "react";
import PropertyService from "@/utils/propertyService";
import { useRouter } from "next/navigation";
import InputWLabel from "@/components/InputWLabel";

export default function UpdateProperty({ property }: { property: Property }) {
  const [name, setName] = useState(property.name);
  const [location, setLocation] = useState(property.location);
  const [description, setDescription] = useState(property.description ?? "");
  const [price, setPrice] = useState<number>(property.price_per_night);
  const [availability, setAvailability] = useState<boolean>(
    property.availability ?? true
  );

  const router = useRouter();

  async function handleSave() {
    const res = await new PropertyService().updateProperty(property.id, {
      name,
      location,
      description,
      price_per_night: price,
      availability,
    });

    if (res.ok) {
      router.push("/properties");
    } else {
      try {
        const data = await res.json();
        alert(data.error ?? "Failed to update property");
      } catch (error) {
        alert("Failed to update property");
      }
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this property?")) return;
    const res = await new PropertyService().deleteProperty(property.id);
    if (res.ok) {
      router.push("/properties");
    } else {
      try {
        const data = await res.json();
        alert(data.error ?? "Failed to delete property");
      } catch (error) {
        alert("Failed to delete property");
      }
    }
  }

  return (
    <div className="p-10 max-w-xl space-y-4">
      <h1 className="text-2xl font-bold mb-2">Edit Property</h1>

      <InputWLabel
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputWLabel
        label="Location"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <InputWLabel
        label="Price per night"
        type="number"
        value={String(price)}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <div className="flex items-center gap-2">
        <input
          id="avail"
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
        <label htmlFor="avail">Available</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>

        <button
          onClick={() => router.push("/properties")}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
