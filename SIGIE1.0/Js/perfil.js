// script.js

// Función para mostrar/ocultar contraseña
function togglePass(id) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Función para crear cuenta (registro)
function createAccount() {
  alert("✅ Cuenta creada con éxito");
}

// Función para actualizar perfil
function updateProfile() {
  alert("💾 Perfil actualizado con éxito");
}

