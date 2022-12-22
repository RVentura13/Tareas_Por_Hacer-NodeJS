import colors from "colors";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  inquirerMenu,
  pause,
  leerInput,
  listaTareasBorrar,
  confirmar,
  mostrarListaCheckList,
} from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let option = "";

  const tareas = new Tareas();

  const tareaDB = leerDB();

  if (tareaDB) {
    tareas.cargarTareas(tareaDB);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case "1":
        //Crear tarea
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        //Listar tareas
        tareas.listarTareas();
        break;
      case "3":
        //Listar tareas Completadas
        tareas.ListarPendientesCompletadas();
        break;
      case "4":
        //Listar tareas Pendientes
        tareas.ListarPendientesCompletadas(false);
        break;
      case "5":
        // Completar | Pendiente
        const ids = await mostrarListaCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        //Borrar tareas
        const id = await listaTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const ok = await confirmar("¿Estás seguro de eliminar esta tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea eliminada");
          }
        } else {
          ("No hay tareas que borrar");
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    if (option !== 0) await pause();
    console.clear();
  } while (option !== "0");
};
main();
