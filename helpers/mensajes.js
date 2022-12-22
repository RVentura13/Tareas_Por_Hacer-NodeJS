const { resolve } = require("path");
const { stdin } = require("process");

require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=======================".green);
    console.log(" Seleccione una opción".green);
    console.log("=======================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Ver tarea(s)`);
    console.log(`${"3.".green} Tareas pendientes`);
    console.log(`${"4.".green} Tareas completadas`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea(s)`);
    console.log(`${"0.".green} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (option) => {
      readline.close();
      resolve(option);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (option) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pause,
};
