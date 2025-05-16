const readline = require("readline-sync");
const { correos } = require("./correos");

const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.ar)$/;

function listarCorreos() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
  } else {
    console.log("Correos registrados:");
    console.log(correos.join(" - "));
  }
}

function agregarCorreo() {
  const nuevo = readline.question("Ingrese el nuevo correo: ");

  if (regexCorreo.test(nuevo)) {
    correos.push(nuevo);
    console.log("Correo válido agregado.");
  } else {
    console.log("Correo inválido. Debe contener '@' y terminar en .com o .com.ar");
  }
}

function eliminarCorreo() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
    return;
  }

  listarCorreos();
  const correoAEliminar = readline.question("Ingrese el correo que desea eliminar: ").toLowerCase();

  const indice = correos.findIndex(correo => correo.toLowerCase() === correoAEliminar);

  if (indice !== -1) {
    const eliminado = correos.splice(indice, 1);
    console.log(`Correo eliminado: ${eliminado[0]}`);
  } else {
    console.log("Correo no encontrado.");
  }
}

function modificarCorreo() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
    return;
  }

  listarCorreos();
  const correoActual = readline.question("Ingrese el correo que desea modificar: ").toLowerCase();
  const indice = correos.findIndex(correo => correo.toLowerCase() === correoActual);

  if (indice !== -1) {
    const nuevoCorreo = readline.question("Ingrese el nuevo correo: ");
    correos[indice] = nuevoCorreo;
    console.log("Correo modificado.");
  } else {
    console.log("Correo no encontrado.");
  }
}

function buscarCorreo() {
  const termino = readline.question("Buscar correos que contengan: ").toLowerCase();

  const resultados = correos.filter(correo =>
    correo.toLowerCase().includes(termino)
  );

  if (resultados.length > 0) {
    console.log("Resultados encontrados:");
    console.log(resultados.join(" - "));
  } else {
    console.log("No se encontraron coincidencias.");
  }
}

function extraerDominios() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
    return;
  }

  const conteo = correos.reduce((acumulador, correo) => {
    const partes = correo.split("@");
    if (partes.length < 2) return acumulador;

    const despuesDelArroba = partes[1];
    const dominio = despuesDelArroba.split(".")[0];

    acumulador[dominio] = (acumulador[dominio] || 0) + 1;
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