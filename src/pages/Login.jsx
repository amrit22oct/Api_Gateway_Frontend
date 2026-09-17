// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginApi } from "../api/auth.api";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ===============================
//   // HANDLE INPUT
//   // ===============================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ===============================
//   // HANDLE LOGIN
//   // ===============================
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const data = await loginApi(formData);

//       console.log("Login successful:", data);

//       navigate("/");
//     } catch (error) {
//       console.error("Login failed:", error);

//       setError(
//         error.response?.data?.message ||
//           "Invalid email or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-4">
//       <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">

//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-[var(--primary)]">
//             DevGate
//           </h1>

//           <p className="mt-2 text-[var(--text-light)]">
//             API Gateway Management Platform
//           </p>
//         </div>

//         <form onSubmit={handleLogin}>

//           {/* Email */}
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

//           {/* Password */}
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

//           {/* Error */}
//           {error && (
//             <div className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
//               {error}
//             </div>
//           )}

//           {/* Login */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-[var(--primary)] py-3 font-semibold text-white transition-all duration-300 hover:bg-[var(--primary-dark)] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         <p className="mt-6 text-center text-sm text-[var(--text-light)]">
//           Secure • Fast • Reliable API Gateway
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../api/auth.api";

import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { Alert } from "../components/atoms/Alert";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginApi(formData);
      console.log("Login successful:", data);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle={
        <>
          New to DevGate?{" "}
          <Link to="/register" className="cursor-pointer font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline hover:underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <Alert message={error} />

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

        <div className="space-y-1">
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
          <div className="flex justify-end">
            <button type="button" className="cursor-pointer text-xs font-medium text-zinc-500 transition-colors hover:text-white">
              Forgot password?
            </button>
          </div>
        </div>

        <div className="pt-3">
          <Button type="submit" isLoading={loading}>
            Sign In
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;