import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const token = localStorage.getItem('token');

  return (
    <nav className="backdrop-blur-md bg-white/30 border border-white/50 shadow-lg px-6 py-3 rounded-xl flex justify-center items-center space-x-8 mb-6 transition transform hover:scale-105">
      {!token ? (
        <>
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:text-blue-700 transition"
          >
            📝 Register
          </Link>
          <Link
            to="/login"
            className="text-green-500 font-semibold hover:text-green-700 transition"
          >
            🔑 Login
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/dashboard"
            className="text-indigo-500 font-semibold hover:text-indigo-700 transition"
          >
            📊 Dashboard
          </Link>
          <button
            onClick={onLogout}
            className="text-red-500 font-semibold hover:text-red-700 transition"
          >
            🚪 Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
