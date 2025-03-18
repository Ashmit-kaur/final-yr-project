import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyApp
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/signin"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-600 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-700 hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
