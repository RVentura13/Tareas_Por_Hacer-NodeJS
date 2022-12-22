import { v4 as uuidv4 } from "uuid";
class Tarea {
  id = "";
  descripcion = "";
  completadaEl = null;

  constructor(descripcion) {
    this.id = uuidv4();
    this.descripcion = descripcion;
  }
}

export { Tarea };
