"use client";

import { useUser } from "@/contexts/user";
import { useState } from "react";
import InputWLabel from "../InputWLabel";

export default function AuthForm() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  const onSubmit = async () => {
    if (mode === "login") {
      await user.actions.login(email, password);
    } else {
      await user.actions.register(email, password);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {mode === "login" ? "Log In" : "Register"}
      </h2>

      <InputWLabel
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputWLabel
        label="Password"
        type="password"
        placeholder="******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        onClick={onSubmit}
      >
        {mode === "login" ? "Login" : "Register"}
      </button>

      <p className="mt-3 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => setMode("register")}
              className="text-blue-600 cursor-pointer"
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
}
