/* =================================================================
   SIGIE — Sistema de Gestión de Incidentes Escolares
   Lógica de interfaz · Vanilla JS
   ================================================================= */

(() => {
  'use strict';

  /* =============================================
     DATOS DEMO
     ============================================= */
  const ROLE_LABEL = {
    director: 'Director',
    administrador: 'Administrador',
    docente: 'Docente',
    enfermera: 'Enfermera',
    tutor: 'Padre / Tutor'
  };

  const VIEW_LABELS = {
    dashboard:  'Resumen',
    incidents:  'Incidencias',
    register:   'Registrar incidencia',
    students:   'Alumnos',
    medical:    'Expediente médico',
    followup:   'Seguimiento',
    reports:    'Reportes',
    audit:      'Bitácora / Auditoría',
    users:      'Usuarios',
    settings:   'Configuración'
  };

  const incidents = [
    { folio: 'INC-0421', alumno: 'Mariana Reyes',     iniciales: 'MR', grupo: '3° A', tipo: 'Caída en patio',     gravedad: 'Moderada', fecha: '27 abr · 10:42', resp: 'Juan G.',   estado: 'En proceso', estadoCls: 'badge-warn' },
    { folio: 'INC-0420', alumno: 'Diego Aguilar',     iniciales: 'DA', grupo: '5° B', tipo: 'Conducta',            gravedad: 'Leve',     fecha: '27 abr · 09:15', resp: 'Director',  estado: 'Liberado',   estadoCls: 'badge-ok' },
    { folio: 'INC-0419', alumno: 'Sofía Padilla',     iniciales: 'SP', grupo: '2° A', tipo: 'Atención médica',     gravedad: 'Severa',   fecha: '26 abr · 14:08', resp: 'Enf. Laura',estado: 'Urgente',    estadoCls: 'badge-crit' },
    { folio: 'INC-0418', alumno: 'Emiliano Martínez', iniciales: 'EM', grupo: '4° C', tipo: 'Convivencia',         gravedad: 'Leve',     fecha: '26 abr · 11:30', resp: 'Juan G.',   estado: 'Liberado',   estadoCls: 'badge-ok' },
    { folio: 'INC-0417', alumno: 'Renata Vázquez',    iniciales: 'RV', grupo: '1° B', tipo: 'Caída leve',          gravedad: 'Leve',     fecha: '25 abr · 12:05', resp: 'Enf. Laura',estado: 'Liberado',   estadoCls: 'badge-ok' },
    { folio: 'INC-0416', alumno: 'Andrés Salinas',    iniciales: 'AS', grupo: '6° A', tipo: 'Conducta',            gravedad: 'Moderada', fecha: '24 abr · 13:22', resp: 'Director',  estado: 'En proceso', estadoCls: 'badge-warn' },
    { folio: 'INC-0415', alumno: 'Valeria Mora',      iniciales: 'VM', grupo: '4° A', tipo: 'Convivencia',         gravedad: 'Leve',     fecha: '24 abr · 09:50', resp: 'Juan G.',   estado: 'En proceso', estadoCls: 'badge-warn' },
    { folio: 'INC-0414', alumno: 'Luis Ortiz',        iniciales: 'LO', grupo: '5° A', tipo: 'Atención médica',     gravedad: 'Moderada', fecha: '23 abr · 15:10', resp: 'Enf. Laura',estado: 'En proceso', estadoCls: 'badge-warn' },
    { folio: 'INC-0413', alumno: 'Camila Hernández',  iniciales: 'CH', grupo: '3° B', tipo: 'Caída leve',          gravedad: 'Leve',     fecha: '22 abr · 11:00', resp: 'Enf. Laura',estado: 'Liberado',   estadoCls: 'badge-ok' },
    { folio: 'INC-0412', alumno: 'Iván Zamora',       iniciales: 'IZ', grupo: '6° B', tipo: 'Conducta',            gravedad: 'Leve',     fecha: '22 abr · 09:35', resp: 'Director',  estado: 'Liberado',   estadoCls: 'badge-ok' }
  ];

  const students = [
    { name: 'Mariana Reyes',     ini: 'MR', meta: '3° A · 8 años',  inc: 4,  med: 2, last: '27 abr' },
    { name: 'Diego Aguilar',     ini: 'DA', meta: '5° B · 10 años', inc: 2,  med: 0, last: '27 abr' },
    { name: 'Sofía Padilla',     ini: 'SP', meta: '2° A · 7 años',  inc: 6,  med: 4, last: '26 abr' },
    { name: 'Emiliano Martínez', ini: 'EM', meta: '4° C · 9 años',  inc: 1,  med: 0, last: '26 abr' },
    { name: 'Renata Vázquez',    ini: 'RV', meta: '1° B · 6 años',  inc: 3,  med: 1, last: '25 abr' },
    { name: 'Andrés Salinas',    ini: 'AS', meta: '6° A · 11 años', inc: 5,  med: 1, last: '24 abr' },
    { name: 'Valeria Mora',      ini: 'VM', meta: '4° A · 9 años',  inc: 2,  med: 0, last: '24 abr' },
    { name: 'Luis Ortiz',        ini: 'LO', meta: '5° A · 10 años', inc: 3,  med: 2, last: '23 abr' }
  ];

  const auditLog = [
    { time: '11:02', icon: '✉', title: 'Notificación enviada al tutor', meta: 'Folio #INC-0421 · M. Reyes', user: 'sistema' },
    { time: '10:42', icon: '+', title: 'Incidencia registrada',          meta: 'Folio #INC-0421 · Aula 3°A', user: 'j.gonzalez' },
    { time: '09:30', icon: '✓', title: 'Etapa cambiada a Liberado',      meta: 'Folio #INC-0420',           user: 'l.morales' },
    { time: '09:15', icon: '+', title: 'Incidencia registrada',          meta: 'Folio #INC-0420 · D. Aguilar', user: 'j.gonzalez' },
    { time: '08:42', icon: '↻', title: 'Contraseña actualizada',         meta: 'Cuenta: c.reyes',           user: 'c.reyes' },
    { time: '08:15', icon: '→', title: 'Inicio de sesión',               meta: 'IP 192.168.1.4 · Director', user: 'r.flores' },
    { time: '07:00', icon: '⌫', title: 'Respaldo automático completado', meta: '3.2 GB · 00:00:42',         user: 'sistema' },
    { time: '06:45', icon: '⚙', title: 'Configuración modificada',       meta: 'Plantilla de notificación', user: 'e.hernandez' }
  ];

  /* =============================================
     INYECCIÓN DE DATOS
     ============================================= */
  function renderIncidents() {
    const tbody = document.getElementById('incidentsTbody');
    if (!tbody) return;
    tbody.innerHTML = incidents.map(i => `
      <tr>
        <td><input type="checkbox"/></td>
        <td><span class="mono">#${i.folio}</span></td>
        <td>
          <div class="cell-user">
            <div class="avatar avatar-sm">${i.iniciales}</div>
            <div><div class="cell-name">${i.alumno}</div></div>
          </div>
        </td>
        <td>${i.grupo}</td>
        <td>${i.tipo}</td>
        <td>${i.gravedad}</td>
        <td>${i.fecha}</td>
        <td>${i.resp}</td>
        <td><span class="badge ${i.estadoCls}">${i.estado}</span></td>
        <td><button class="row-btn" data-folio="${i.folio}">Ver</button></td>
      </tr>
    `).join('');
  }

  function renderStudents() {
    const grid = document.getElementById('studentsGrid');
    if (!grid) return;
    grid.innerHTML = students.map(s => `
      <article class="student-card">
        <div class="student-head">
          <div class="avatar">${s.ini}</div>
          <div>
            <div class="student-name">${s.name}</div>
            <div class="student-meta">${s.meta}</div>
          </div>
        </div>
        <div class="student-stats">
          <div>
            <span class="student-stat-num">${s.inc}</span>
            <span class="student-stat-lbl">Incidencias</span>
          </div>
          <div>
            <span class="student-stat-num">${s.med}</span>
            <span class="student-stat-lbl">Médicas</span>
          </div>
          <div style="margin-left:auto;text-align:right;">
            <span class="student-stat-num" style="font-size:13px;color:var(--ink-3);">${s.last}</span>
            <span class="student-stat-lbl">Últ. registro</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderAudit() {
    const list = document.getElementById('auditList');
    if (!list) return;
    list.innerHTML = auditLog.map(a => `
      <div class="audit-item">
        <span class="audit-time">Hoy ${a.time}</span>
        <span class="audit-icon">${a.icon}</span>
        <div>
          <div class="audit-title">${a.title}</div>
          <div class="audit-meta">${a.meta}</div>
        </div>
        <span class="audit-user">@${a.user}</span>
      </div>
    `).join('');
  }

  /* =============================================
     LOGIN
     ============================================= */
  const loginForm = document.getElementById('loginForm');
  const screenLogin = document.getElementById('screen-login');
  const screenApp = document.getElementById('screen-app');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value || 'usuario@institucion.edu.mx';

    // Actualizar rol mostrado
    document.getElementById('userRole').textContent = ROLE_LABEL[role] || 'Usuario';

    // Avatar — primer carácter del email
    const ini = email.split('@')[0].slice(0, 2).toUpperCase();
    document.querySelectorAll('.user-pill .avatar').forEach(a => a.textContent = ini);

    // Transición
    screenLogin.classList.remove('active');
    screenApp.classList.add('active');
    showToast('Sesión iniciada correctamente');
  });

  /* =============================================
     LOGOUT
     ============================================= */
  document.getElementById('logoutBtn').addEventListener('click', () => {
    screenApp.classList.remove('active');
    screenLogin.classList.add('active');
    showToast('Sesión cerrada');
  });

  /* =============================================
     NAVEGACIÓN
     ============================================= */
  function navigate(viewName) {
    // Vistas
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.querySelector(`.view[data-view="${viewName}"]`);
    if (target) target.classList.add('active');

    // Sidebar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (navItem) navItem.classList.add('active');

    // Breadcrumb
    const crumb = document.getElementById('crumbCurrent');
    if (crumb) crumb.textContent = VIEW_LABELS[viewName] || 'Vista';

    // Scroll
    document.querySelector('.main')?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Click en sidebar
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.dataset.view;
      if (view) navigate(view);
    });
  });

  // Botones con data-go
  document.addEventListener('click', (e) => {
    const goBtn = e.target.closest('[data-go]');
    if (goBtn) {
      e.preventDefault();
      navigate(goBtn.dataset.go);
    }
  });

  /* =============================================
     FORMULARIO DE INCIDENCIA
     ============================================= */
  const incidentForm = document.getElementById('incidentForm');
  if (incidentForm) {
    incidentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newFolio = `INC-${String(422 + Math.floor(Math.random() * 100)).padStart(4, '0')}`;
      showToast(`Incidencia #${newFolio} registrada · Tutor notificado`);
      setTimeout(() => navigate('incidents'), 800);
    });
  }

  /* =============================================
     ROW BUTTONS
     ============================================= */
  document.addEventListener('click', (e) => {
    const rowBtn = e.target.closest('.row-btn');
    if (rowBtn && rowBtn.dataset.folio) {
      showToast(`Abriendo detalle de #${rowBtn.dataset.folio}…`);
    }
  });

  /* =============================================
     CHIP TOGGLE
     ============================================= */
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) {
      const group = chip.closest('.chip-group');
      if (group) {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
    }
  });

  /* =============================================
     TOGGLE SIDEBAR (mobile)
     ============================================= */
  document.getElementById('toggleSidebar')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  /* =============================================
     TOAST
     ============================================= */
  let toastTimeout;
  function showToast(message) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = message;
    // pequeño truco para conservar el ::before
    t.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* =============================================
     ATAJOS DE TECLADO
     ============================================= */
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K → enfoca búsqueda
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      document.querySelector('.topbar .search input')?.focus();
    }
    // Esc → cierra toast
    if (e.key === 'Escape') {
      document.getElementById('toast')?.classList.remove('show');
    }
  });

  /* =============================================
     INIT
     ============================================= */
  renderIncidents();
  renderStudents();
  renderAudit();

})();
