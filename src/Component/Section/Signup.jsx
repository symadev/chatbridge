import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Context/useAuthStore";
import { useEffect } from "react";

Modal.setAppElement("#root");

const Signup = ({ isOpen, onRequestClose, openLogin }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { createUser, loading, error, clearError } = useAuthStore();

  //  Clear error when modal opens
  useEffect(() => {
    if (isOpen) {
      clearError();
    }
  }, [isOpen, clearError]);

  const onSubmit = async (data) => {
    //  Pass username (not name) to match backend
    const success = await createUser(data.email, data.password, data.username);

    if (success) {
      reset();
      onRequestClose();
      navigate("/"); //  Navigate to chat page after signup
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Register"
      overlayClassName="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-indigo-900/60 to-blue-900/80 backdrop-blur-sm flex justify-center items-center z-50"
      className="bg-gradient-to-br from-slate-800 via-indigo-900 to-blue-900 text-white p-8 rounded-3xl w-full max-w-lg border border-indigo-400/30 relative shadow-2xl shadow-indigo-500/20"
    >
      {/* Close button */}
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-indigo-300 hover:text-white text-2xl transition-all duration-300 hover:rotate-90 hover:scale-110"
      >
        &times;
      </button>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          ChatBridge SignUp
        </h2>
        <p className="text-indigo-200 text-sm mt-1">
          Your Favorite AI Assistant
        </p>
      </div>

      {/*  Error message display */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        {/* Username (changed from Name) */}
        <div>
          <label className="block text-sm text-indigo-200 mb-2 font-medium">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" }
            })}
            placeholder="johndoe"
            className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          />
          {errors.username && <p className="text-blue-400 text-sm mt-1">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-indigo-200 mb-2 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          />
          {errors.email && <p className="text-blue-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-indigo-200 mb-2 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 72, message: "Password cannot exceed 72 characters" }
            })}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          />
          {errors.password && <p className="text-blue-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing Up...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {/* Redirect to Login */}
      <p className="text-center text-sm mt-4 text-indigo-200 relative z-10">
        Already have an account?
        <button
          type="button"
          onClick={() => {
            onRequestClose();
            openLogin();
          }}
          className="ml-1 underline text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          Login
        </button>
      </p>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
    </Modal>
  );
};

export default Signup;