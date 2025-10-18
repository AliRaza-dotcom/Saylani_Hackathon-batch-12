import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import {
  HeartPulse,
  Mail,
  Lock,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(login(values)).unwrap();
        toast.success("✅ Welcome back!");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error || "❌ Login failed");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 font-[Poppins] px-4">
      {/* Background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-xl p-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-indigo-500 to-cyan-500 p-3 rounded-2xl shadow-md">
            <HeartPulse className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            <span className="text-indigo-600">Med</span>
            <span className="text-cyan-500">Sphere</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Your digital health partner 💙
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formik.isValid || !formik.dirty}
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Links */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-cyan-600 font-semibold"
          >
            Create One
          </Link>
        </p>

        <p className="text-center text-gray-500 text-sm mt-6">
          <Link
            to="/"
            className="hover:text-indigo-600 flex items-center justify-center gap-2"
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;