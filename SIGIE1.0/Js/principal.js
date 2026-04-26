
// Cambiar entre vistas (login, error, registro, olvidé contraseña)
function showView(viewId, btn) {
  document.querySelectorAll('.form-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + viewId).classList.add('active');

  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    document.querySelectorAll('.view-btn').forEach(b => {
      if (b.dataset.view === viewId) b.classList.add('active');
    });
  }

  const loginContainer = document.querySelector('.login-container');
  if (loginContainer) {
    loginContainer.classList.toggle('hide-brand', viewId !== 'login');
  }

  const switcher = document.querySelector('.view-switcher');
  if (switcher) {
    
    switch (viewId) {
      case 'login':
        switcher.innerHTML = '<button class="view-btn" onclick="showView(\'register\', this)">📝 Registro</button>' + perfilBtn;
        break;
      case 'register':
        switcher.innerHTML = '<button class="view-btn" onclick="showView(\'login\', this)">🏠 Volver</button>' + perfilBtn;
        break;
      case 'forgot':
        switcher.innerHTML = '<button class="view-btn" onclick="showView(\'login\', this)">🏠 Volver</button>' + perfilBtn;
        break;
      case 'error':
        switcher.innerHTML = '<button class="view-btn" onclick="showView(\'login\', this)">🏠 Volver</button>' + perfilBtn;
        break;
    }
  }
}

// Mostrar/ocultar contraseña
function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Seleccionar rol en el registro
function selectRole(element) {
  document.querySelectorAll('.role-option').forEach(o => o.classList.remove('active'));
  element.classList.add('active');
}

// Crear cuenta - validar y redirigir a login
function createAccount() {
  const rol = document.getElementById('rol').value;
  const inputs = document.querySelectorAll('#view-register .form-input');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  const checkbox = document.querySelector('#view-register input[type="checkbox"]');
  if (!checkbox.checked) {
    isValid = false;
    alert('Debes aceptar el aviso de privacidad y términos de uso');
  }

  if (isValid) {
    alert('¡Cuenta creada exitosamente! Ahora inicia sesión con tus credenciales.');
    document.querySelectorAll('#view-register .form-input').forEach(input => input.value = '');
    document.querySelector('#view-register input[type="checkbox"]').checked = false;
    showView('login');
  }
}

// Función para determinar el rol basado en las credenciales
function determinarRol(email, password) {
  // Lógica de ejemplo para determinar roles basados en patrones de email
  // En un sistema real, esto vendría de una base de datos

  const emailLower = email.toLowerCase();

  // Administradores
  if (emailLower.includes('admin') || emailLower.includes('sistema') || emailLower.includes('root')) {
    return 'administrador';
  }

  // Directores
  if (emailLower.includes('director') || emailLower.includes('coord') || emailLower.includes('jefe')) {
    return 'director';
  }

  // Enfermeras
  if (emailLower.includes('enfermer') || emailLower.includes('nurse') || emailLower.includes('salud')) {
    return 'enfermera';
  }

  // Tutores
  if (emailLower.includes('tutor') || emailLower.includes('orientador') || emailLower.includes('asesor')) {
    return 'tutor';
  }

  // Por defecto, docentes
  return 'docente';
}

// Función de inicio de sesión
function iniciarSesion() {
  const emailInput = document.querySelector('#view-login input[type="email"]');
  const passwordInput = document.querySelector('#view-login input[type="password"]');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validación básica
  if (!email || !password) {
    alert('Por favor ingresa tu correo electrónico y contraseña.');
    return;
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor ingresa un correo electrónico válido.');
    emailInput.focus();
    return;
  }

  // Validación de longitud de contraseña
function validatePasswords() {
  const pass = document.getElementById("pass3").value;
  const confirmPass = document.getElementById("pass4").value;

  if (pass === confirmPass && pass.length >= 8) {
    alert("✅ Contraseña confirmada correctamente");
    return true; // válido
  } else {
    alert("❌ Las contraseñas no coinciden o son demasiado cortas");
    return false; // inválido
  }
}
  // Simulación de autenticación (en un sistema real, esto sería una llamada a API)
  // Credenciales de ejemplo para testing
  const usuariosValidos = {
    // Administradores
    'admin@sigie.mx': { password: 'admin123', rol: 'administrador' },
    'sistema@sigie.mx': { password: 'sistema123', rol: 'administrador' },

    // Directores
    'director@sigie.mx': { password: 'director123', rol: 'director' },
    'coordinador@sigie.mx': { password: 'coord123', rol: 'director' },

    // Enfermeras
    'enfermera@sigie.mx': { password: 'enfermera123', rol: 'enfermera' },
    'salud@sigie.mx': { password: 'salud123', rol: 'enfermera' },

    // Tutores
    'tutor@sigie.mx': { password: 'tutor123', rol: 'tutor' },
    'orientador@sigie.mx': { password: 'orientador123', rol: 'tutor' },

    // Docentes
    'docente@sigie.mx': { password: 'docente123', rol: 'docente' },
    'profesor@sigie.mx': { password: 'profesor123', rol: 'docente' },
    'maestro@sigie.mx': { password: 'maestro123', rol: 'docente' }
  };

  // Verificar credenciales
  const usuario = usuariosValidos[email.toLowerCase()];

  if (!usuario || usuario.password !== password) {
    // Mostrar vista de error
    showView('error');
    return;
  }

  // Determinar rol (usando el rol específico o determinándolo por patrón)
  const rol = usuario.rol || determinarRol(email, password);

  // Guardar información de sesión
  localStorage.setItem('usuarioLogueado', JSON.stringify({
    email: email,
    rol: rol,
    loginTime: new Date().toISOString()
  }));

  // Redirigir al feed correspondiente
  window.location.href = `usuarios.html?rol=${rol}`;
}