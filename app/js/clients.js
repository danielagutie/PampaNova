const tbody = document.querySelector("#tablaClientes tbody");

//Lista de Clientes
const CargarClientes = async () => {
  try {
    const clients = await axiosBackEnd.get('clients.json');

    clients.data.forEach(client => {
      tbody.innerHTML += `
      <tr id=${client.id}>
        <td>${client.id}</td>
        <td data-name="${client.nombre}">${client.nombre}</td>
        <td>${client.email}</td>
        <td>${client.telefono}</td>
        <td><button class="btn-delete btn btn-danger btn-sm">Eliminar</button></td>
      </tr>
    `;
    });
  }

  catch (error) {
    tbody.innerHTML += `
      <tr>
        <td colspan="5">Se produjo un error al recuperar los clientes.</td>
      </tr>
    `;
  }
}

//Agregar Cliente
const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
  Swal.fire({
    title: "Se agregará un cliente",
    icon: "info",
    confirmButtonText: "OK"
  });
});

//Eliminar Cliente
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const tr = e.target.closest("tr");
    const td = tr.querySelector("td[data-name]");
    const clientName = td.dataset.name;

    Swal.fire({
      title: `¿Seguro que deseas eliminar al cliente ${clientName}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cliente eliminado", "", "success");
      } else if (result.isDismissed) {
        Swal.fire("El cliente no se eliminará", "", "info");
      }
    });
    ;
  }
});

CargarClientes();
