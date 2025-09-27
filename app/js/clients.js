//Elementos html
const tbody = document.querySelector("#tablaClientes tbody");
const btnAgregar = document.getElementById("btnAgregar");


//Lista de Clientes
const CargarClientes = async () => {
  try {
    const clients = await axiosBackEnd.get('clients.json');

    let rows = "";

    clients.data.forEach(client => {
      rows += `
      <tr id="${client.id}">
        <td>${client.id}</td>
        <td data-name="${client.nombre}">${client.nombre}</td>
        <td>${client.email}</td>
        <td>${client.telefono}</td>
        <td><button class="btn-delete btn btn-danger btn-sm">Eliminar</button></td>
      </tr>
    `;
    });

    tbody.innerHTML = rows;
  }

  catch (error) {
    tbody.innerHTML += `
      <tr>
        <td colspan="5">Se produjo un error al recuperar los clientes.</td>
      </tr>
    `;
  }
}

//Agregar cliente
btnAgregar.addEventListener("click", async () => {
  const response = await fetch("client.html");
  const formHtml = await response.text();

  FormModal.fire({
    title: "Agregar cliente",
    html: formHtml,
    preConfirm: () => {
      const id = document.getElementById("idCliente").value.trim();
      const nombre = document.getElementById("nombreCliente").value.trim();
      const email = document.getElementById("emailCliente").value.trim();
      const tel = document.getElementById("telCliente").value.trim();

      // Validaciones
      if (!id || !nombre || !email || !tel) {
        Swal.showValidationMessage("Todos los campos son obligatorios");
        return false;
      }

      return { id, nombre, email, tel };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { id, nombre, email, tel } = result.value;

      //Nueva fila
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${id}</td>
        <td data-name="${nombre}">${nombre}</td>
        <td>${email}</td>
        <td>${tel}</td>
        <td>
          <button class="btn-delete btn btn-danger btn-sm">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);

      Swal.fire("Cliente agregado", "", "success");
    }
  });
});

//Eliminar Cliente
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const tr = e.target.closest("tr");
    const td = tr.querySelector("td[data-name]");
    const clientName = td.dataset.name;

    FormModal.fire({
      title: `¿Seguro que deseas eliminar al cliente ${clientName}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning"
    }).then((result) => {
      if (result.isConfirmed) {
        tr.remove();
        Swal.fire("Cliente eliminado", "", "success");
      } else if (result.isDismissed) {
        Swal.fire("El cliente no se eliminará", "", "info");
      }
    });
  }
});

CargarClientes();
