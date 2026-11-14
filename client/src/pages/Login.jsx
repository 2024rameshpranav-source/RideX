
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Car, ArrowRight } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Login interface is ready. Backend authentication will be connected next.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="px-6 py-5 flex items-center justify-between bg-white border-b">

        <Link to="/" className="text-3xl font-bold text-gray-900">
          Ride<span className="text-green-600">X</span>
        </Link>

        <Link
          to="/register"
          className="text-sm font-semibold text-gray-700 hover:text-green-600"
        >
          Create account
        </Link>

      </nav>

      {/* Login Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Car size={32} className="text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue your RideX journey.
            </p>

          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                />

              </div>

              {/* Password */}
              <div>

                <div className="flex justify-between items-center mb-2">

                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-green-600"
                />

                <label
                  htmlFor="rememberMe"
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Sign in
                <ArrowRight size={18} />
              </button>

            </form>

            {/* Registration Link */}
            <div className="mt-6 text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Sign up
                </Link>
              </p>

            </div>

          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-8">
            By continuing, you agree to RideX's Terms of Service and Privacy Policy.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Login;
