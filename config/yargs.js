const descripcion = {
    default: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado la tarea.'
};


const argv = require('yargs')
    .command('crear', 'Crear una tarea.', {
        descripcion
    })
    .command('actualizar', 'Actualizar tareas.', {
        descripcion,
        completado
    })
    .command('borrar', 'Eliminar tareas', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
}