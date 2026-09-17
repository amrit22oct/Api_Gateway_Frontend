// const AuthLayout = ({ children }) => {
//    return (
//      <div
//        style={{
//          minHeight: "100vh",
//          display: "grid",
//          placeItems: "center",
//          background: "#f4f4f4",
//        }}
//      >
//        {children}
//      </div>
//    );
//  };
 
//  export default AuthLayout;




const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 font-sans selection:bg-indigo-500/30 px-4 py-12">
      {/* Background Radial Glows */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-2/3 w-1/2 rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen" />
      <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-2/3 w-1/2 rounded-full bg-violet-600/20 blur-[120px] mix-blend-screen" />

      {/* Floating Card */}
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {title && <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>}
            {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
          </div>

          {children}
        </div>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Secure • Fast • Reliable API Gateway</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;