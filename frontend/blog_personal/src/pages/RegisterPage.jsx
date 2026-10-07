import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { formState, handleInputChange, handleReset } = useForm({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      const data = await response.json();

      if (response.ok) {
        handleReset();
        navigate('/login');
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([{ msg: data.message || 'Error en el registro' }]);
        }
      }
    } catch (err) {
      setErrors([{ msg: 'Error de conexión con el servidor' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Registro de Usuario</h2>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm space-y-1">
            {errors.map((err, index) => (
              <p key={index}>• {err.msg}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formState.username}
            onChange={handleInputChange}
            required
            className="w-full border border-slate-300 p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formState.email}
            onChange={handleInputChange}
            required
            className="w-full border border-slate-300 p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formState.password}
            onChange={handleInputChange}
            required
            className="w-full border border-slate-300 p-2 rounded"
          />
          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={formState.first_name}
            onChange={handleInputChange}
            required
            className="w-full border border-slate-300 p-2 rounded"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formState.last_name}
            onChange={handleInputChange}
            required
            className="w-full border border-slate-300 p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded font-semibold transition"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-4">
          ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};