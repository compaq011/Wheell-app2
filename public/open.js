
const items = [
  { name: "Recoil", chance: 60, image: "images/Recoil.jpg" },
  { name: "Fracture", chance: 27, image: "images/Fracture.jpg" },
  { name: "Revolution", chance: 0.05, image: "images/Revolution.jpg" },
  { name: "kilowatt", chance: 4, image: "images/kilowatt.jpg" },
  { name: "tickettohell", chance: 3, image: "images/tickettohell.jpg" },
  { name: "gallery", chance: 0.05, image: "images/gallery.jpg" },
  { name: "Chroma2", chance: 2, image: "images/Chroma2.jpg" },
  { name: "Glock18-vogue", chance: 0, image: "images/Glock18-vogue.jpg" },
];

const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");
const rollSound = document.getElementById("rollSound");

function getRandomItemByChance() {
  const total = items.reduce((acc, item) => acc + item.chance, 0);
  let rand = Math.random() * total;
  for (let item of items) {
    if (rand < item.chance) return item;
    rand -= item.chance;
  }
  return items[0];
}

function generateItems(count = 100) {
  let visuals = [];
  for (let i = 0; i < count; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    visuals.push(item);
  }
  return visuals;
}

function displayItems(visuals) {
  scrollArea.innerHTML = "";
  visuals.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.image;
    scrollArea.appendChild(img);
  });
}

function animateScroll(visuals, winnerItem) {
  const index = visuals.findIndex((item) => item.name === winnerItem.name);
  const itemWidth = scrollArea.children[0].offsetWidth + 20;
  const totalShift = index * itemWidth - scrollArea.offsetWidth / 2 + itemWidth / 2;
  let currentShift = 0;
  let startTime = null;
  const duration = 4000;

  function animate(time) {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    currentShift = easeOut * totalShift;
    scrollArea.style.transform = `translateX(-${currentShift}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      winnerImage.src = winnerItem.image;
      winnerModal.style.display = "block";
      fetch("/winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(winnerItem),
      });
    }
  }

  requestAnimationFrame(animate);
}

openButton.addEventListener("click", () => {
  winnerModal.style.display = "none";
  rollSound.play();
  const visuals = generateItems(100);
  const winner = getRandomItemByChance();
  visuals[70] = winner;
  displayItems(visuals);
  animateScroll(visuals, winner);
});
