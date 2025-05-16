const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.ar)$/;

function esCorreoValido(correo) {
  return regexCorreo.test(correo);
}

module.exports = { esCorreoValido };
