import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("isLogged");
      navigate("/login");
    }
  };
  return (
    <nav className="bg-[#655A7C] text-[#FDF1E2] p-4 shadow-md flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold text-[#FDF1E2] hover:text-[#AB92BF]"
      >
        Blog Personal
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};
