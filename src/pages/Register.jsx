
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerApi } from "../api/auth.api";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // HANDLE INPUT
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setError("");
//   };

//   // HANDLE REGISTER
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     setError("");

//     // CHECK PASSWORD
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Data that will be sent to backend
//       const registerData = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       };

//       // CALL REGISTER API
//       const data = await registerApi(registerData);

//       console.log("Registration successful:", data);

//       // Go to login page
//       navigate("/login");

//     } catch (error) {
//       console.error("Registration failed:", error);

//       setError(
//         error.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-4 py-8">

//       <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">

//         {/* HEADER */}
//         <div className="mb-8 text-center">

//           <h1 className="text-4xl font-bold text-[var(--primary)]">
//             DevGate
//           </h1>

//           <p className="mt-2 text-[var(--text-light)]">
//             Create your account
//           </p>

//         </div>

//         {/* FORM */}
//         <form onSubmit={handleRegister}>

//           {/* NAME */}
//           <div className="mb-5">

//             <label className="mb-2 block text-sm font-medium text-[var(--text)]">
//               Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               required
//               className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]"
//             />

//           </div>

//           {/* EMAIL */}
//           <div className="mb-5">

//             <label className="mb-2 block text-sm font-medium text-[var(--text)]">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               required
//               className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]"
//             />

//           </div>

//           {/* PASSWORD */}
//           <div className="mb-5">

//             <label className="mb-2 block text-sm font-medium text-[var(--text)]">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//               className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]"
//             />

//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="mb-5">

//             <label className="mb-2 block text-sm font-medium text-[var(--text)]">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//               className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)]"
//             />

//           </div>

//           {/* ERROR */}
//           {error && (
//             <div className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
//               {error}
//             </div>
//           )}

//           {/* REGISTER BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-[var(--primary)] py-3 font-semibold text-white transition-all duration-300 hover:bg-[var(--primary-dark)] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//         </form>

//         {/* LOGIN LINK */}
//         <p className="mt-6 text-center text-sm text-[var(--text-light)]">

//           Already have an account?{" "}

//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
//           >
//             Login
//           </button>

//         </p>

//         {/* FOOTER */}
//         <p className="mt-4 text-center text-xs text-[var(--text-light)]">
//           Secure • Fast • Reliable API Gateway
//         </p>

//       </div>

//     </div>
//   );
// };

// export default Register;







import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../api/auth.api";

import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { Alert } from "../components/atoms/Alert";
import AuthLayout from "../layout/AuthLayout";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const data = await registerApi(registerData);
      console.log("Registration successful:", data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join DevGate" 
      subtitle={
        <>
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline hover:underline-offset-4">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <Alert message={error} />

        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="pt-4">
          <Button type="submit" isLoading={loading}>
            Create Account
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;