function StatusIndicator({ status }) {
  const statusDetails = {
    cargando: { className: 'status-cargando', label: 'Cargando' },
    exito: { className: 'status-exito', label: 'Actualizado' },
    error: { className: 'status-error', label: 'Error' },
    inactivo: { className: 'status-inactivo', label: 'Inactivo' },
  };
  const currentStatus = statusDetails[status] || statusDetails.inactivo;

  return (
    <div className={`status-indicator ${currentStatus.className}`}>
      <span className="status-dot" />
      <span>{currentStatus.label}</span>
    </div>
  );
}

export default StatusIndicator;