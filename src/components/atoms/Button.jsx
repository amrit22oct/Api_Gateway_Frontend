export const Button = ({ children, isLoading, ...props }) => {
   return (
     <button
       disabled={isLoading}
       className="relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-zinc-950 transition-all duration-300 ease-out hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
       {...props}
     >
       {isLoading ? (
         <div className="flex items-center gap-2">
           <svg className="h-5 w-5 animate-spin text-zinc-950" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
           </svg>
           <span>Processing...</span>
         </div>
       ) : (
         children
       )}
     </button>
   );
 };