const readline = require("readline-sync");

const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.ar)$/;

let correos = [
  "ana@gmail.com",
  "carlos@yahoo.com",
  "mariana@hotmail.com",
  "sofia@gmail.com",
  "lucas@outlook.com"
];

function mostrarMenu() {
  console.log("\n=== GESTIÓN DE CORREOS ===");
  console.log("1. Listar correos");
  console.log("2. Agregar correo (Alta)");
  console.log("3. Eliminar correo (Baja)");
  console.log("4. Modificar correo");
  console.log("5. Filtrar correo");
  console.log("6. Extraer dominios");
  console.log("7. Salir");
}

function listarCorreos() {
  if (correos.length === 0) {
    console.log("No hay correos registrados.");
  } else {
    console.log("Correos registrados:");
    console.log(correos.join(" - "));
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
    const dominio = despuesDelArroba.split(".")[0]; // dominio principal

    acumulador[dominio] = (acumulador[dominio] || 0) + 1;
    return acumulador;
  }, {});

  console.log("Cantidad de correos por dominio:");
  for (const dominio in conteo) {
    console.log(`${dominio}: ${conteo[dominio]}`);
  }
}

function agregarCorreo() {
  const nuevo = readline.question("Ingrese el nuevo correo: ");
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.ar)$/;

  if (regexCorreo.test(nuevo)) {
    correos.push(nuevo);
    console.log("Correo válido agregado.");
  } else {
    console.log("Correo inválido. Debe contener '@' y terminar en .com o .com.ar");
  }
}

function eliminarCorreo() {
  listarCorreos();
  const i = readline.questionInt("Número de correo a eliminar: ") - 1;
  if (i >= 0 && i < correos.length) {
    const eliminado = correos.splice(i, 1);
    console.log(`Correo eliminado: ${eliminado}`);
  } else {
    console.log("Índice inválido.");
  }
}

function modificarCorreo() {
  listarCorreos();
  const i = readline.questionInt("Número de correo a modificar: ") - 1;
  if (i >= 0 && i < correos.length) {
    const nuevo = readline.question("Ingrese el nuevo correo: ");
    correos[i] = nuevo;
    console.log("Correo modificado.");
  } else {
    console.log("Índice inválido.");
  }
}

// Bucle principal
let opcion;
do {
  mostrarMenu();
  opcion = readline.question("Seleccione una opción: ");

  switch (opcion) {
    case "1":
      listarCorreos();
      break;
    case "2":
      agregarCorreo();
      break;
    case "3":
      eliminarCorreo();
      break;
    case "4":
      modificarCorreo();
      break;
    case "5":
      buscarCorreo();
      break;
    case "6":
      extraerDominios();
      break;
    case "7":
        console.log("Saliendo del sistema...");
        break;
    default:
      console.log("Opción inválida.");
  }
} while (opcion !== "7");
