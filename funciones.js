const readline = require("readline-sync");
const { correos } = require("./correos");
const { esCorreoValido } = require("./validacion");

// Funcion para listar los correos existentes
function listarCorreos() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
  } else {
    console.log("Correos registrados:");
    console.log(correos.join(" - ")); // Crea una cadena de texto con los correos separados por " - "
  }
}

// Funcion para agregar un nuevo correo a la lista
function agregarCorreo() {
  const nuevo = readline.question("Ingrese el nuevo correo: ");
 
  // Validar el nuevo correo con la expresión regular
  if (esCorreoValido(nuevo)) {
    correos.push(nuevo);
    console.log("Correo válido agregado.");
  } else {
    console.log("Correo inválido. Debe contener '@' y terminar en .com o .com.ar");
  }
}

// Funcion para eliminar un correo de la lista
function eliminarCorreo() {
  // Comprueba que exista al menos un correo registrado
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
    return;
  }

  listarCorreos();
  const correoAEliminar = readline.question("Ingrese el correo que desea eliminar: ").toLowerCase();
  
  // FindIndex devuelve el primer índice que cumple la condición o -1 si no lo encuentra
  const indice = correos.findIndex(correo => correo.toLowerCase() === correoAEliminar); 

  if (indice !== -1) {
    const eliminado = correos.splice(indice, 1); // Se crea una nueva lista con el correo eliminado 
    console.log(`Correo eliminado: ${eliminado[0]}`);
  } else {
    console.log("Correo no encontrado.");
  }
}

// Funcion para modificar un correo existente
function modificarCorreo() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
    return;
  }

  listarCorreos();
  const correoActual = readline.question("Ingrese el correo que desea modificar: ").toLowerCase();

  // FindIndex devuelve el primer índice que cumple la condición o -1 si no lo encuentra
  const indice = correos.findIndex(correo => correo.toLowerCase() === correoActual);

  if (indice !== -1) {
    const nuevoCorreo = readline.question("Ingrese el nuevo correo: ");
    if (esCorreoValido(nuevoCorreo)) { // Valida que el correo ingresado sea correcto
      correos[indice] = nuevoCorreo;
      console.log("Correo modificado.");
    } else {
      console.log("Correo inválido, debe contener '@' y terminar en .com o .com.ar");
      return;
    }
  } else {
    console.log("Correo no encontrado.");
  }
}

// Buscar correos que contengan un término específico
function buscarCorreo() {
  const termino = readline.question("Buscar correos que contengan: ").toLowerCase();

  // Devuelve un nuevo array con los correos que contienen el término ingresado
  const resultados = correos.filter(correo => correo.toLowerCase().includes(termino));

  if (resultados.length > 0) {
    console.log("Resultados encontrados:");
    console.log(resultados.join(" - ")); // Crea una cadena de texto con los correos separados por " - "
  } else {
    console.log("No se encontraron coincidencias.");
  }
}

// Extraer dominios de los correos y contar la cantidad de correos por dominio
function extraerDominios() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
    return;
  }

  // Reduce crea un nuevo objeto donde se acumulan los dominios y su cantidad
  const conteo = correos.reduce((acumulador, correo) => {
    const partes = correo.split("@"); // Separa el correo en dos partes: antes y después del arroba
    if (partes.length < 2) return acumulador;

    const despuesDelArroba = partes[1]; // Se queda con la parte después del arroba
    const dominio = despuesDelArroba.split(".")[0]; // Se queda con la parte antes del primer punto

    acumulador[dominio] = (acumulador[dominio] || 0) + 1; // Incrementa el contador del dominio
    return acumulador;
  }, {});

  console.log("Cantidad de correos por dominio:");
  for (const dominio in conteo) {
    console.log(`${dominio}: ${conteo[dominio]}`);
  }
}

module.exports = {
  listarCorreos,
  agregarCorreo,
  eliminarCorreo,
  modificarCorreo,
  buscarCorreo,
  extraerDominios
};