// Guardar los archivos en memoria del navegador y permitir descargarlos
const storage = {};

document.querySelectorAll(".file-input").forEach((input, index) => {
  input.addEventListener("change", () => {
    const week = index + 1;
    const file = input.files[0];

    if (file) {
      document.getElementById("name" + week).textContent = file.name;

      // Guardar archivo en memoria (simulado con FileReader)
      const reader = new FileReader();
      reader.onload = e => {
        storage[week] = {
          name: file.name,
          data: e.target.result
        };
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById("name" + week).textContent = "Ningún archivo seleccionado";
      delete storage[week];
    }
  });
});

// Descargar archivo guardado
document.querySelectorAll(".btn-download").forEach(button => {
  button.addEventListener("click", () => {
    const week = button.getAttribute("data-week");
    if (storage[week]) {
      const link = document.createElement("a");
      link.href = storage[week].data;
      link.download = storage[week].name;
      link.click();
    } else {
      alert("No hay archivo para descargar en esta semana.");
    }
  });
});
