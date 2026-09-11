function StatusIndicator({ status }) {
  let badgeClasses = '';
  let label = '';
  let dotClasses = '';

  switch (status) {
    case 'cargando':
      badgeClasses = 'bg-amber-100 text-amber-700 border-amber-200';
      dotClasses = 'bg-amber-400 animate-pulse';
      label = 'Cargando';
      break;
    case 'exito':
      badgeClasses = 'bg-emerald-100 text-emerald-700 border-emerald-200';
      dotClasses = 'bg-emerald-400';
      label = 'Actualizado';
      break;
    case 'error':
      badgeClasses = 'bg-rose-100 text-rose-700 border-rose-200';
      dotClasses = 'bg-rose-400';
      label = 'Error';
      break;
    case 'inactivo':
    default:
      badgeClasses = 'bg-slate-100 text-slate-500 border-slate-200';
      dotClasses = 'bg-slate-300';
      label = 'Inactivo';
      break;
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${badgeClasses}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotClasses}`} />
      {label}
    </div>
  );
}

export default StatusIndicator;