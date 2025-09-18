import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white shadow-sm">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-blue-900 tracking-tight">
            Welcome to CollabSpace
          </h1>
          <p className="mt-2 text-sm text-blue-600">
            Sign in or create an account to start saving and sharing ideas.
          </p>

          <div className="mt-8 grid gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-white text-sm font-medium shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-blue-700 text-sm font-medium hover:bg-blue-50 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition"
            >
              Signup
            </Link>
          </div>
        </div>

        <div className="px-8 pb-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          <p className="mt-4 text-xs text-blue-500">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
