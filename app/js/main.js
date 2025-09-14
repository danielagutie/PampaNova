//Resaltar el menu activo
const setPage = (currentPage) => {

  let menuSelected;
  let title;

  if (currentPage.includes('clients.html')) {
    title = "Clientes"
    menuSelected = 'menu-clients';
  } else if (currentPage.includes('products.html')) {
    title = "Productos"
    menuSelected = 'menu-products';
  }
  else if (currentPage.includes('index.html')) {
    title = "Bienenvenido al sistema"
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
