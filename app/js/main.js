//Resaltar el menu activo
const setPage = (currentPage) => {

  let menuSelected;
  let title;

  if (currentPage.includes('clients.html')) {
    title = "Clientes"
    menuSelected = 'menu-clients';
  } 
  else if (currentPage.includes('products.html')) {
    title = ""
    menuSelected = 'menu-products';
  }
  else {
    title = "Bienvenido al sistema"
    menuSelected = 'menu-index';
  }

  document.getElementById(menuSelected)?.classList.add('active');
  document.querySelector("h1").textContent = title;

}

document.addEventListener("DOMContentLoaded", () => {
  setPage(window.location.pathname);
});

//Crear la instancia axios
const axiosBackEnd = axios.create({ baseURL: "backend/" });

//Crear los formularios modales con un estilo configurado
window.FormModal = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-2',
    cancelButton: 'btn btn-secondary'
  },
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Aceptar',
  cancelButtonText: 'Cancelar'
});

