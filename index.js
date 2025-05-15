const readline = require("readline-sync");

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
  console.log("5. Salir");
}

function listarCorreos() {
  console.log("\n📧 Correos actuales:");
  correos.forEach((correo, i) => {
    console.log(`${i + 1}. ${correo}`);
  });
}

function agregarCorreo() {
  const nuevo = readline.question("Ingrese el nuevo correo: ");
  correos.push(nuevo);
  console.log("✅ Correo agregado.");
}

function eliminarCorreo() {
  listarCorreos();
  const i = readline.questionInt("Número de correo a eliminar: ") - 1;
  if (i >= 0 && i < correos.length) {
    const eliminado = correos.splice(i, 1);
    console.log(`🗑️ Correo eliminado: ${eliminado}`);
  } else {
    console.log("❌ Índice inválido.");
  }
}

function modificarCorreo() {
  listarCorreos();
  const i = readline.questionInt("Número de correo a modificar: ") - 1;
  if (i >= 0 && i < correos.length) {
    const nuevo = readline.question("Ingrese el nuevo correo: ");
    correos[i] = nuevo;
    console.log("✏️ Correo modificado.");
  } else {
    console.log("❌ Índice inválido.");
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
      console.log("👋 Saliendo del sistema...");
      break;
    default:
      console.log("❗ Opción inválida.");
  }
} while (opcion !== "5");
