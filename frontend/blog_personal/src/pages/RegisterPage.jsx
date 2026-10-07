import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogged", "true");
        navigate("/");
      } else {
        setErrorMessage(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setErrorMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Iniciar Sesión
        </h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-1">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              required
              className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              required
              className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded font-semibold transition"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
