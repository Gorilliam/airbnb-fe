import AuthForm from "@/components/auth/AuthForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Airbnb Clone</h1>
        <AuthForm />
      </div>
    </main>
  );
}

