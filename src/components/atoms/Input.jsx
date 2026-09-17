import { useState } from "react";

export const Input = ({ label, id, error, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="group space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold tracking-wide text-zinc-400 transition-colors duration-200 group-focus-within:text-indigo-400 cursor-pointer"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`block w-full rounded-xl border bg-zinc-950/50 px-4 py-3 text-sm text-white shadow-inner transition-all duration-300 placeholder:text-zinc-600 focus:outline-none focus:ring-4 cursor-text ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : "border-white/10 hover:border-white/20 hover:bg-zinc-900 focus:border-indigo-500 focus:bg-zinc-900 focus:ring-indigo-500/20"
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 transition-colors hover:text-white focus:outline-none cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              /* Eye Off Icon */
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a17.9 17.9 0 012.172-2.828m3.868-2.672A10.007 10.007 0 0112 5c7 0 10 7 10 7a18.254 18.254 0 01-2.172 2.828M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
              </svg>
            ) : (
              /* Eye Icon */
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="flex items-center text-xs font-medium text-red-400 animate-in fade-in slide-in-from-top-1">
          <svg className="mr-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};