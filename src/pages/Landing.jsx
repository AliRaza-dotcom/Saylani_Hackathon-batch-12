import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Brain,
  ShieldCheck,
  Upload,
  Users,
  BarChart3,
  Send,
  ChevronDown,
  Star,
} from "lucide-react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const contactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().min(10, "Message too short").required("Message is required"),
});

const Landing = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [sending, setSending] = useState(false);

  const contactForm = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      setSending(true);
      try {
        await axios.post(`${API_URL}/contact`, values);
        toast.success("✅ Message sent successfully!");
        resetForm();
      } catch (err) {
        toast.error("❌ Failed to send message");
      } finally {
        setSending(false);
      }
    },
  });

  const faqs = [
    {
      q: "What is MedSphere?",
      a: "MedSphere is your digital health companion — upload reports, track vitals, and get AI-driven insights instantly.",
    },
    {
      q: "Is my data private?",
      a: "Absolutely. MedSphere uses encryption and HIPAA-grade protection to keep your health information safe.",
    },
    {
      q: "Can I manage family health profiles?",
      a: "Yes! You can add multiple family members and view everyone’s progress in one dashboard.",
    },
  ];

  return (
    <div className="font-[Poppins] text-gray-800">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              Med<span className="text-indigo-500">Sphere</span>
            </h1>
          </Link>
          <div className="hidden md:flex gap-6 font-medium">
            <a href="#features" className="hover:text-indigo-500">
              Features
            </a>
            <a href="#faq" className="hover:text-indigo-500">
              FAQ
            </a>
            <a href="#contact" className="hover:text-indigo-500">
              Contact
            </a>
          </div>
          <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="text-indigo-500 font-semibold hover:text-indigo-600"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>
       
               <div className="container mx-auto px-6 relative z-10">
               {/* Animated Heading */}
       <motion.h1
         className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4"
         initial={{ opacity: 0, y: 40 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1.2, ease: "easeOut" }}
       >
         <motion.span
           className="text-indigo-600 inline-block"
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5, duration: 1 }}
         >
           Your
         </motion.span>{" "}
         <motion.span
           className="inline-block"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.9, duration: 0.8 }}
         >
           Health
         </motion.span>
         <motion.span
           className="text-indigo-600 inline-block"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.4, duration: 0.8 }}
         >
           , Reimagined
         </motion.span>
       </motion.h1>
                 <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                   Upload reports, track your progress, and let our AI guide you towards a healthier life.
                 </p>
       
                 <div className="flex gap-4 justify-center flex-wrap">
                   <Link
                     to="/register"
                     className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="border-2 border-indigo-500 text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-indigo-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose MedSphere?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Upload />, title: "Smart Report Uploads", desc: "AI analyzes and explains lab results instantly." },
              { icon: <Brain />, title: "AI Health Insights", desc: "Get personalized tips and trends from your data." },
              { icon: <ShieldCheck />, title: "End-to-End Encryption", desc: "Your data is always private and secure." },
              { icon: <Users />, title: "Family Health Management", desc: "Add multiple profiles and manage together." },
              { icon: <BarChart3 />, title: "Progress Dashboard", desc: "Visualize your vitals with sleek analytics." },
              { icon: <HeartPulse />, title: "24/7 Access", desc: "Your health data, wherever you go." },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="bg-indigo-100 w-14 h-14 flex items-center justify-center rounded-xl mb-4 text-indigo-600">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-800"
                >
                  {f.q}
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-500 transition-transform ${
                      activeFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
                    <p className="text-gray-700">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What People Say 💬
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{i === 1 ? "👩‍⚕️" : i === 2 ? "👨‍💼" : "🧑‍🦱"}</div>
                  <div>
                    <h4 className="font-bold text-lg">User {i}</h4>
                    <p className="text-gray-600 text-sm">MedSphere Member</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">
                  “MedSphere made my health tracking so simple — I finally understand my reports!”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-10">Get In Touch</h2>
          <form onSubmit={contactForm.handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                name="name"
                value={contactForm.values.name}
                onChange={contactForm.handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                  contactForm.errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={contactForm.values.email}
                onChange={contactForm.handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                  contactForm.errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                value={contactForm.values.message}
                onChange={contactForm.handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                  contactForm.errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="text-gray-400 mb-2">
          © 2025 MedSphere — Your AI Health Companion
        </p>
        <p className="text-gray-500 text-sm">
          ⚕️ For informational purposes only, not medical advice
        </p>
      </footer>
    </div>
  );
};

export default Landing;
