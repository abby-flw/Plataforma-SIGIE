// usuarios.js - Funciones consolidadas para todas las interfaces de usuario

// Función para cambiar de rol
function cambiarRol(rol) {
  // Ocultar todos los paneles
  const paneles = document.querySelectorAll('.panel-rol');
  paneles.forEach(panel => panel.style.display = 'none');

  // Mostrar el panel seleccionado
  const panelSeleccionado = document.getElementById(`panel-${rol}`);
  if (panelSeleccionado) {
    panelSeleccionado.style.display = 'block';
  }

  // Actualizar el título del header
  const tituloHeader = document.querySelector('.header-info h1');
  const tituloRol = document.querySelector('.user-role');

  switch(rol) {
    case 'docente':
      tituloHeader.textContent = 'Sistema SIGIE - Docente';
      tituloRol.textContent = 'DOCENTE';
      break;
    case 'tutor':
      tituloHeader.textContent = 'Sistema SIGIE - Tutor';
      tituloRol.textContent = 'TUTOR';
      break;
    case 'enfermera':
      tituloHeader.textContent = 'Sistema SIGIE - Enfermera';
      tituloRol.textContent = 'ENFERMERA';
      break;
    case 'director':
      tituloHeader.textContent = 'Sistema SIGIE - Director';
      tituloRol.textContent = 'DIRECTOR';
      break;
    case 'administrador':
      tituloHeader.textContent = 'Sistema SIGIE - Administrador';
      tituloRol.textContent = 'ADMINISTRADOR';
      break;
  }

  // Guardar el rol seleccionado en localStorage
  localStorage.setItem('rolSeleccionado', rol);
}

// Función para mostrar sección específica
function mostrarSeccion(seccionId) {
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll('.content-section');
  secciones.forEach(seccion => seccion.classList.remove('active'));

  // Mostrar la sección seleccionada
  const seccionSeleccionada = document.getElementById(seccionId);
  if (seccionSeleccionada) {
    seccionSeleccionada.classList.add('active');
  }

  // Actualizar navegación activa
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const navItemActivo = document.querySelector(`[onclick="mostrarSeccion('${seccionId}')"]`);
  if (navItemActivo) {
    navItemActivo.classList.add('active');
  }
}

// FUNCIONES PARA DOCENTE

// Función para filtrar incidencias
function filtrarIncidencias() {
  const filtro = document.getElementById('filtroIncidencias').value.toLowerCase();
  const incidencias = document.querySelectorAll('.incidencia-card');

  incidencias.forEach(incidencia => {
    const titulo = incidencia.querySelector('h3').textContent.toLowerCase();
    const descripcion = incidencia.querySelector('p').textContent.toLowerCase();

    if (titulo.includes(filtro) || descripcion.includes(filtro)) {
      incidencia.style.display = 'block';
    } else {
      incidencia.style.display = 'none';
    }
  });
}

// Función para buscar consultas
function buscarConsultas() {
  const busqueda = document.getElementById('busquedaConsultas').value.toLowerCase();
  const consultas = document.querySelectorAll('.consulta-card');

  consultas.forEach(consulta => {
    const titulo = consulta.querySelector('h3').textContent.toLowerCase();
    const descripcion = consulta.querySelector('p').textContent.toLowerCase();

    if (titulo.includes(busqueda) || descripcion.includes(busqueda)) {
      consulta.style.display = 'block';
    } else {
      consulta.style.display = 'none';
    }
  });
}

// Función para marcar consulta como completada
function marcarCompletada(id) {
  const consulta = document.querySelector(`.consulta-card[data-id="${id}"]`);
  if (consulta) {
    consulta.querySelector('.card-status').textContent = 'Completada';
    consulta.querySelector('.card-status').className = 'card-status status-completada';
  }
}

// Función para ver detalles de consulta
function verDetallesConsulta(id) {
  alert(`Mostrando detalles de la consulta ${id}`);
}

// FUNCIONES PARA TUTOR

// Función para filtrar tutorías
function filtrarTutorias() {
  const filtro = document.getElementById('filtroTutorias').value.toLowerCase();
  const tutorias = document.querySelectorAll('.tutoria-card');

  tutorias.forEach(tutoria => {
    const titulo = tutoria.querySelector('h3').textContent.toLowerCase();
    const descripcion = tutoria.querySelector('p').textContent.toLowerCase();

    if (titulo.includes(filtro) || descripcion.includes(filtro)) {
      tutoria.style.display = 'block';
    } else {
      tutoria.style.display = 'none';
    }
  });
}

// Función para programar tutoría
function programarTutoria() {
  const fecha = document.getElementById('fechaTutoria').value;
  const hora = document.getElementById('horaTutoria').value;
  const estudiante = document.getElementById('estudianteTutoria').value;
  const tema = document.getElementById('temaTutoria').value;

  if (!fecha || !hora || !estudiante || !tema) {
    alert('Por favor complete todos los campos');
    return;
  }

  alert(`Tutoría programada:\nFecha: ${fecha}\nHora: ${hora}\nEstudiante: ${estudiante}\nTema: ${tema}`);
}

// Función para cancelar tutoría
function cancelarTutoria(id) {
  if (confirm('¿Está seguro de que desea cancelar esta tutoría?')) {
    const tutoria = document.querySelector(`.tutoria-card[data-id="${id}"]`);
    if (tutoria) {
      tutoria.remove();
    }
  }
}

// FUNCIONES PARA ENFERMERA

// Función para filtrar pacientes
function filtrarPacientes() {
  const filtro = document.getElementById('filtroPacientes').value.toLowerCase();
  const pacientes = document.querySelectorAll('.paciente-item');

  pacientes.forEach(paciente => {
    const nombre = paciente.querySelector('h4').textContent.toLowerCase();
    const descripcion = paciente.querySelector('p').textContent.toLowerCase();

    if (nombre.includes(filtro) || descripcion.includes(filtro)) {
      paciente.style.display = 'block';
    } else {
      paciente.style.display = 'none';
    }
  });
}

// Función para ver detalles del paciente
function verDetallesPaciente(id) {
  alert(`Mostrando detalles del paciente ${id}`);
}

// Función para agregar nota médica
function agregarNotaMedica(id) {
  const nota = prompt('Ingrese la nota médica:');
  if (nota) {
    alert(`Nota médica agregada para el paciente ${id}: ${nota}`);
  }
}

// Función para filtrar emergencias
function filtrarEmergencias() {
  const filtro = document.getElementById('filtroEmergencias').value.toLowerCase();
  const emergencias = document.querySelectorAll('.emergencia-item');

  emergencias.forEach(emergencia => {
    const titulo = emergencia.querySelector('h4').textContent.toLowerCase();
    const descripcion = emergencia.querySelector('p').textContent.toLowerCase();

    if (titulo.includes(filtro) || descripcion.includes(filtro)) {
      emergencia.style.display = 'block';
    } else {
      emergencia.style.display = 'none';
    }
  });
}

// Función para atender emergencia
function atenderEmergencia(id) {
  alert(`Atendiendo emergencia ${id}`);
}

// Función para generar reporte médico
function generarReporteMedico(id) {
  alert(`Generando reporte médico para el paciente ${id}`);
}

// FUNCIONES PARA DIRECTOR

// Función para filtrar reuniones
function filtrarReuniones() {
  const filtro = document.getElementById('filtroReuniones').value.toLowerCase();
  const reuniones = document.querySelectorAll('.reunion-item');

  reuniones.forEach(reunion => {
    const titulo = reunion.querySelector('h4').textContent.toLowerCase();
    const descripcion = reunion.querySelector('p').textContent.toLowerCase();

    if (titulo.includes(filtro) || descripcion.includes(filtro)) {
      reunion.style.display = 'block';
    } else {
      reunion.style.display = 'none';
    }
  });
}

// Función para programar reunión
function programarReunion() {
  const titulo = document.getElementById('tituloReunion').value;
  const fecha = document.getElementById('fechaReunion').value;
  const hora = document.getElementById('horaReunion').value;
  const participantes = Array.from(document.querySelectorAll('input[name="participantes"]:checked')).map(cb => cb.value);

  if (!titulo || !fecha || !hora || participantes.length === 0) {
    alert('Por favor complete todos los campos');
    return;
  }

  alert(`Reunión programada:\nTítulo: ${titulo}\nFecha: ${fecha}\nHora: ${hora}\nParticipantes: ${participantes.join(', ')}`);
}

// Función para cancelar reunión
function cancelarReunion(id) {
  if (confirm('¿Está seguro de que desea cancelar esta reunión?')) {
    const reunion = document.querySelector(`.reunion-item[data-id="${id}"]`);
    if (reunion) {
      reunion.remove();
    }
  }
}

// Función para filtrar personal
function filtrarPersonal() {
  const filtro = document.getElementById('filtroPersonal').value.toLowerCase();
  const personal = document.querySelectorAll('.personal-item');

  personal.forEach(persona => {
    const nombre = persona.querySelector('h4').textContent.toLowerCase();
    const descripcion = persona.querySelector('p').textContent.toLowerCase();

    if (nombre.includes(filtro) || descripcion.includes(filtro)) {
      persona.style.display = 'block';
    } else {
      persona.style.display = 'none';
    }
  });
}

// Función para ver detalles del personal
function verDetallesPersonal(id) {
  alert(`Mostrando detalles del personal ${id}`);
}

// FUNCIONES PARA ADMINISTRADOR

// Función para filtrar usuarios
function filtrarUsuarios() {
  const filtro = document.getElementById('filtroUsuarios').value.toLowerCase();
  const usuarios = document.querySelectorAll('.usuario-item');

  usuarios.forEach(usuario => {
    const nombre = usuario.querySelector('h4').textContent.toLowerCase();
    const email = usuario.querySelector('p').textContent.toLowerCase();

    if (nombre.includes(filtro) || email.includes(filtro)) {
      usuario.style.display = 'block';
    } else {
      usuario.style.display = 'none';
    }
  });
}

// Función para editar usuario
function editarUsuario(id) {
  alert(`Editando usuario ${id}`);
}

// Función para desactivar usuario
function desactivarUsuario(id) {
  if (confirm('¿Está seguro de que desea desactivar este usuario?')) {
    const usuario = document.querySelector(`.usuario-item[data-id="${id}"]`);
    if (usuario) {
      usuario.style.opacity = '0.5';
      usuario.querySelector('.btn-small.desactivar').textContent = 'Activar';
      usuario.querySelector('.btn-small.desactivar').onclick = () => activarUsuario(id);
    }
  }
}

// Función para activar usuario
function activarUsuario(id) {
  const usuario = document.querySelector(`.usuario-item[data-id="${id}"]`);
  if (usuario) {
    usuario.style.opacity = '1';
    usuario.querySelector('.btn-small.desactivar').textContent = 'Desactivar';
    usuario.querySelector('.btn-small.desactivar').onclick = () => desactivarUsuario(id);
  }
}

// Función para crear respaldo
function crearRespaldo() {
  alert('Creando respaldo de la base de datos...');
  setTimeout(() => {
    alert('Respaldo completado exitosamente');
  }, 2000);
}

// Función para restaurar respaldo
function restaurarRespaldo() {
  if (confirm('¿Está seguro de que desea restaurar el respaldo? Esta acción no se puede deshacer.')) {
    alert('Restaurando respaldo...');
    setTimeout(() => {
      alert('Restauración completada exitosamente');
    }, 3000);
  }
}

// Función para limpiar logs
function limpiarLogs() {
  if (confirm('¿Está seguro de que desea limpiar todos los logs del sistema?')) {
    const logsLista = document.querySelector('.logs-lista');
    if (logsLista) {
      logsLista.innerHTML = '<p>No hay logs disponibles</p>';
    }
  }
}

// FUNCIONES COMUNES

// Función para cerrar sesión
function cerrarSesion() {
  if (confirm('¿Está seguro de que desea cerrar sesión?')) {
    localStorage.removeItem('rolSeleccionado');
    window.location.href = 'Index.html';
  }
}

// Función para ir al perfil
function irAlPerfil() {
  window.location.href = 'perfil.html';
}

// Función para mostrar/ocultar contraseña
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

// Función para validar formulario
function validarFormulario(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  for (let input of inputs) {
    if (!input.value.trim()) {
      alert(`Por favor complete el campo: ${input.name || input.placeholder || 'requerido'}`);
      input.focus();
      return false;
    }
  }

  return true;
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info') {
  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion ${tipo}`;
  notificacion.textContent = mensaje;

  // Agregar estilos básicos
  notificacion.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  // Colores según tipo
  switch(tipo) {
    case 'success':
      notificacion.style.backgroundColor = '#28a745';
      break;
    case 'error':
      notificacion.style.backgroundColor = '#dc3545';
      break;
    case 'warning':
      notificacion.style.backgroundColor = '#ffc107';
      notificacion.style.color = '#000';
      break;
    default:
      notificacion.style.backgroundColor = '#2E75B6';
  }

  // Agregar al DOM
  document.body.appendChild(notificacion);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    notificacion.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notificacion);
    }, 300);
  }, 5000);
}

// Función para confirmar acción
function confirmarAccion(mensaje, callback) {
  if (confirm(mensaje)) {
    callback();
  }
}

// Función para exportar datos a CSV
function exportarCSV(datos, nombreArchivo) {
  const csvContent = "data:text/csv;charset=utf-8,"
    + datos.map(row => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", nombreArchivo);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Función para imprimir elemento
function imprimirElemento(elementId) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    const ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write('<html><head><title>Imprimir</title>');
    ventanaImpresion.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
    ventanaImpresion.document.write('</head><body>');
    ventanaImpresion.document.write(elemento.innerHTML);
    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();
  }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si hay un rol en la URL (desde login automático)
  const urlParams = new URLSearchParams(window.location.search);
  const rolDesdeURL = urlParams.get('rol');

  if (rolDesdeURL) {
    // Si viene desde login, mostrar directamente el panel del rol
    cambiarRol(rolDesdeURL);
    // Ocultar el selector de roles
    document.querySelector('.role-selector').style.display = 'none';
    // Mostrar el contenido principal
    document.querySelector('.main-container').style.display = 'flex';
  } else {
    // Si no hay rol en URL, mostrar selector de roles
    document.querySelector('.role-selector').style.display = 'flex';
    document.querySelector('.main-container').style.display = 'none';
  }

  // Cargar rol guardado si existe
  const rolGuardado = localStorage.getItem('rolSeleccionado');
  if (rolGuardado && !rolDesdeURL) {
    cambiarRol(rolGuardado);
  }

  // Agregar animaciones CSS si no existen
  if (!document.getElementById('animaciones-usuarios')) {
    const style = document.createElement('style');
    style.id = 'animaciones-usuarios';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }

      .notificacion {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);
  }
});
