const GlassCard = ({ className = "", children }) => {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 
      backdrop-blur-lg shadow-xl shadow-black/40 p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
