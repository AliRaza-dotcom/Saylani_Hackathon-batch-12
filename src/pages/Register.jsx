import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { HeartPulse, Mail, Lock, User, Loader } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

// ✅ Validation Schema
const registerValidationSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          register({
            name: values.name,
            email: values.email,
            password: values.password,
          })
        ).unwrap();
        toast.success("✅ Account created successfully!");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error || "❌ Registration failed");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-sky-100 font-[Poppins] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/40"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-400 to-sky-500 p-3 rounded-2xl shadow-md">
              <HeartPulse className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Med<span className="text-emerald-600">Vault</span>
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            AI-Powered Health Management Platform
          </p>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-center text-gray-800 mb-6"
        >
          Create Your Account
        </motion.h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-700 mb-1 text-sm">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-emerald-400 outline-none`}
                placeholder="Your name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-700 mb-1 text-sm">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-emerald-400 outline-none`}
                placeholder="your@email.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-700 mb-1 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-emerald-400 outline-none`}
                placeholder="••••••••"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 mb-1 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-emerald-400 outline-none`}
                placeholder="••••••••"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" /> Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
