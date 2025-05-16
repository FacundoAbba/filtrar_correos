const readline = require("readline-sync");
const {
  listarCorreos,
  agregarCorreo,
  eliminarCorreo,
  modificarCorreo,
  buscarCorreo,
  extraerDominios
} = require("./funciones");

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
