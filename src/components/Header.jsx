{
  /* СТИЛЬНЫЕ КНОПКИ ВХОДА */
}
<div className="flex items-center gap-8">
  <Link
    to="/login"
    className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-amber-500 transition-colors"
  >
    {t("nav.login")}
  </Link>

  <Link
    to="/register"
    className="relative group px-7 py-2.5 overflow-hidden rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]"
  >
    {/* Слой градиента и свечения */}
    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:200%_auto] group-hover:bg-[100%_0] transition-all duration-700"></div>

    {/* Текст кнопки */}
    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-black">
      {t("nav.register")}
    </span>
  </Link>
</div>;
