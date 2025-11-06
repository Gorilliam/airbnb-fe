"use client";

import { useState } from "react";

interface PropertyFormProps {
  onSubmit: (data: NewProperty) => void;
  loading?: boolean;
  initialData?: Partial<Property>;
}

export default function PropertyForm({
  onSubmit,
  loading,
  initialData = {},
}: PropertyFormProps) {
  const [form, setForm] = useState<NewProperty>({
    name: initialData.name || "",
    description: initialData.description || "",
    location: initialData.location || "",
    price_per_night: initialData.price_per_night || 0,
    availability: initialData.availability ?? true,
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;
  const checked =
    type === "checkbox" && "checked" in e.target ? e.target.checked : undefined;

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          required
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          name="location"
          type="text"
          required
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price per Night
        </label>
        <input
          name="price_per_night"
          type="number"
          min={0}
          required
          value={form.price_per_night}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          name="availability"
          type="checkbox"
          checked={form.availability}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label className="text-sm font-medium text-gray-700">
          Available for booking
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        {loading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
}
