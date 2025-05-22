// Este modulo se encarga de validar los correos de manera regular 
const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.ar)$/;

function esCorreoValido(correo) {
  return regexCorreo.test(correo); // La funcion test() devuelve true si el correo coincide con la expresión regular
}

module.exports = { esCorreoValido };
