const items = [
  "Recoil.jpg", "Fracture.jpg", "Revolution.jpg",
  "tickettohell.jpg", "Glock18-vogue.jpg", "Chroma2.jpg",
  "kilowatt.jpg", "gallery.jpg"
];

const weights = [60, 27, 0.05, 3, 0, 0, 4, 5];
const imagesPath = "images/";

const scrollArea = document.getElementById("scrollArea");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");
const rollSound = document.getElementById("rollSound");

let isRolling = false;

function getWeightedRandomItem() {
  const total = weights.reduce((a, b) => a + b);
  const rand = Math.random() * total;
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += weights[i];
    if (rand < sum) return items[i];
  }
  return items[0];
}

document.getElementById("openButton").addEventListener("click", () => {
  if (isRolling) return;
  isRolling = true;
  rollSound.play();

  scrollArea.innerHTML = "";

  const images = [];
  for (let i = 0; i < 60; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    const img = document.createElement("img");
    img.src = imagesPath + item;
    images.push(item);
    scrollArea.appendChild(img);
  }

  const winner = getWeightedRandomItem();
  const winnerIndex = images.findIndex(img => img === winner);
  const itemWidth = 110; // image width + margin
  const offset = itemWidth * winnerIndex - scrollArea.offsetWidth / 2 + itemWidth / 2;

  scrollArea.style.transition = "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)";
  scrollArea.style.transform = `translateX(-${offset}px)`;

  setTimeout(() => {
    winnerImage.src = imagesPath + winner;
    winnerModal.style.display = "block";
    isRolling = false;
  }, 4000);
});
