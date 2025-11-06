"use client";

import { useState } from "react";

interface BookingFormProps {
  onSubmit: (data: NewBooking) => void;
  loading?: boolean;
}

export default function BookingForm({ onSubmit, loading }: BookingFormProps) {
  const [form, setForm] = useState<NewBooking>({
    property_id: "",
    check_in_date: "",
    check_out_date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property ID
        </label>
        <input
          name="property_id"
          type="text"
          required
          value={form.property_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter property ID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-in Date
        </label>
        <input
          name="check_in_date"
          type="date"
          required
          value={form.check_in_date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-out Date
        </label>
        <input
          name="check_out_date"
          type="date"
          required
          value={form.check_out_date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        {loading ? "Saving..." : "Create Booking"}
      </button>
    </form>
  );
}
