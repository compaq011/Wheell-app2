document.addEventListener("DOMContentLoaded", () => {
  const scrollArea = document.getElementById("scrollArea");
  const openButton = document.getElementById("openButton");

  const items = [
    "fracture.jpg", "Revolution.jpg", "Recoil.jpg",
    "Chroma2.jpg", "Glock18-vogue.jpg", "kilowatt.jpg", "tickettohell.jpg", "gallery.jpg"
  ];

  // Görselleri yerleştir
  items.forEach((imgName) => {
    const img = document.createElement("img");
    img.src = `images/${imgName}`;
    img.classList.add("item");
    scrollArea.appendChild(img);
  });

  // Buton aktif hale gelsin
  openButton.disabled = false;

  openButton.addEventListener("click", () => {
    document.getElementById("rollSound").play();

    scrollArea.style.transition = "transform 3s ease-out";
    scrollArea.style.transform = `translateX(-${Math.floor(Math.random() * 500)}px)`;
  });
});
