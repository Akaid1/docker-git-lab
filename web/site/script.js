document.getElementById("btn").addEventListener("click", () => {
  const output = document.getElementById("output");
  output.textContent = "Servido por Nginx dentro de um container Docker ✅ (" +
    new Date().toLocaleTimeString() + ")";
});
