
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* RideX Logo */}
        <Link to="/" className="text-3xl font-bold text-gray-900">
          Ride<span className="text-green-600">X</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-green-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
