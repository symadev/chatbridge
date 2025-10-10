import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Context/useAuthStore";
import { useEffect } from "react";

Modal.setAppElement("#root");

const Login = ({ isOpen, onRequestClose, openSignup }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { login, loading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      clearError();
    }
  }, [isOpen, clearError]);

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    
    if (success) {
      reset();
      onRequestClose();
      navigate("/");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login"
      overlayClassName="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-indigo-900/60 to-blue-900/80 backdrop-blur-sm flex justify-center items-center z-50"
      className="bg-gradient-to-br from-slate-800 via-indigo-900 to-blue-900 text-white p-8 rounded-3xl w-full max-w-lg border border-indigo-400/30 relative shadow-2xl shadow-indigo-500/20"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-indigo-300 hover:text-white text-2xl transition-all duration-300 hover:rotate-90 hover:scale-110"
      >
        &times;
      </button>

      <div className="text-center mb-6 relative z-10">
        <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          ChatBridge Login
        </h2>
        <p className="text-indigo-200 text-sm mt-1">
          Welcome back!
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        <div>
          <label className="block text-sm text-indigo-200 mb-2 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          />
          {errors.email && <p className="text-blue-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-indigo-200 mb-2 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          />
          {errors.password && <p className="text-blue-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-indigo-200 relative z-10">
        Don't have an account?
        <button
          type="button"
          onClick={() => {
            onRequestClose();
            openSignup();
          }}
          className="ml-1 underline text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          Sign Up
        </button>
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
    </Modal>
  );
};

export default Login;