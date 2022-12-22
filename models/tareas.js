import { Tarea } from "./tarea.js";

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listarTareas() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green;

      const { descripcion, completadaEl } = tarea;
      const estado = completadaEl ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${descripcion} :: ${estado}`);
    });
  }

  ListarPendientesCompletadas(completadas = true) {
    console.log();
    let idx = 0;
    this.listadoArr.forEach((tarea) => {
      const { descripcion, completadaEl } = tarea;
      const estado = completadaEl ? "Completada".green : "Pendiente".red;

      if (completadas) {
        if (completadaEl) {
          idx += 1;
          console.log(
            `${(idx + ".").green} ${descripcion} :: ${completadaEl.green}`
          );
        }
      } else {
        if (!completadaEl) {
          idx += 1;
          console.log(`${(idx + ".").green} ${descripcion} :: ${estado}`);
        }
      }
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadaEl) {
        tarea.completadaEl = new Date().toLocaleDateString("es-ES");
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadaEl = null;
      }
    });
  }
}

export { Tareas };
