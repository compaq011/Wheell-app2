const cases = [
  { name: "Recoil", image: "images/Recoil.jpg", chance: 60 },
  { name: "Fracture", image: "images/Fracture.jpg", chance: 27 },
  { name: "Kilowatt", image: "images/kilowatt.jpg", chance: 4 },
  { name: "tickettohell", image: "images/tickettohell.jpg", chance: 3 },
  { name: "gallery", image: "images/gallery.jpg", chance: 0.05 },
  { name: "Revolution", image: "images/Revolution.jpg", chance: 0.05 },
  { name: "Chroma2", image: "images/Chroma2.jpg", chance: 0 },
  { name: "Glock18-vogue", image: "images/Glock18-vogue.jpg", chance: 0 },
];

const scrollArea = document.getElementById("scrollArea");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");
const rollSound = document.getElementById("rollSound");

const openButton = document.getElementById("openButton");

function getWeightedRandomCase() {
  const total = cases.reduce((acc, curr) => acc + curr.chance, 0);
  let rand = Math.random() * total;
  for (const c of cases) {
    if (rand < c.chance) return c;
    rand -= c.chance;
  }
  return cases[0];
}

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  scrollArea.innerHTML = "";

  const winner = getWeightedRandomCase();

  const allItems = [];
  for (let i = 0; i < 50; i++) {
    const randomCase = cases[Math.floor(Math.random() * cases.length)];
    const img = document.createElement("img");
    img.src = randomCase.image;
    img.classList.add("item-img");
    allItems.push(img);
    scrollArea.appendChild(img);
  }

  // Winner ortada olacak şekilde diz
  const winningIndex = 24;
  allItems[winningIndex].src = winner.image;

  const itemWidth = 110;
  const totalWidth = itemWidth * 50;
  const targetOffset = itemWidth * (winningIndex - 2);

  // Ses
  rollSound.currentTime = 0;
  rollSound.play();

  scrollArea.style.transition = "transform 6s cubic-bezier(0.1, 0.1, 0.2, 1)";
  scrollArea.style.transform = `translateX(-${targetOffset}px)`;

  setTimeout(() => {
    winnerImage.src = winner.image;
    winnerModal.style.display = "flex";
    openButton.disabled = false;
  }, 6200);
});

winnerModal.addEventListener("click", () => {
  winnerModal.style.display = "none";
});
