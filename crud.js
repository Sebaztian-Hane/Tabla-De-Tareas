const form = document.getElementById("form-tareas");
const tbody = document.getElementById("tabla-cuerpo");


function cargarTareas() {
    const contenido = localStorage.getItem("tareas");
    if (contenido) {
        return JSON.parse(contenido);
    } else {
        return [];
    }
}
function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}


function CargarTabla() {
    const tareas = cargarTareas();
    tbody.innerHTML = "";

    tareas.forEach((p, i) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${p.titulo}</td>
        <td>${p.prioridad}</td>
        <td>${p.estado}</td>
        <td>${p.vencimiento}</td>
        <td class="text-center">
            <button onclick="editar(${i})" class="btn btn-warning btn-sm me-2">
            <i class="bi bi-pencil-square"></i>
            </button>
            <button onclick="eliminar(${i})" class="btn btn-danger btn-sm">
            <i class="bi bi-trash"></i>
            </button>
        </td>
        `;
        tbody.appendChild(fila);
    });
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = form.titulo.value.trim();
    const prioridad = form.prioridad.value.trim();
    const estado = form.estado.value.trim();
    const vencimiento = form.vencimiento.value.trim();
    if (!titulo || !prioridad || !estado || !vencimiento) return;

    const tareas = cargarTareas();

    if (editandoIndex === -1) {
        tareas.push({ titulo, prioridad, estado, vencimiento});
    } else {
        tareas[editandoIndex] = { titulo, prioridad, estado, vencimiento};
        editandoIndex = -1;
    }

    guardarTareas(tareas);
    CargarTabla();
    form.reset();
});


function eliminar(index) {
    const tareas = cargarTareas();
    tareas.splice(index, 1);
    guardarTareas(tareas);
    CargarTabla();
}

let editandoIndex = -1;
function editar(index) {
    const tareas = cargarDatosP();
    const tarea = tareas[index];
    form.titulo.value = tarea.titulo;
    form.prioridad.value = tarea.prioridad;
    form.estado.value = tarea.estado;
    form.vencimeinto.value = tarea.vencimiento;
    editandoIndex = index;
}

document.addEventListener("DOMContentLoaded", CargarTabla);
