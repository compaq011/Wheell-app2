const scrollArea = document.getElementById('scrollArea');
const openButton = document.getElementById('openButton');
const winnerModal = document.getElementById('winnerModal');
const winnerImage = document.getElementById('winnerImage');
const rollSound = document.getElementById('rollSound');
const image = `images/${item.image}`;
// recoil.jpg ✅ ama Recoil.jpg ❌ (ya da tersi)
const cases = [
  { name: 'Fracture', chance: 27 },
  { name: 'Revolution', chance: 0.05 },
  { name: 'Recoil', chance: 60 },
  { name: 'Chroma2', chance: 0.05 },
  { name: 'kilowatt', chance: 4 },
  { name: 'tickettohell', chance: 3 },
  { name: 'gallery', chance: 0.05 },
  { name: 'Glock18-vogue', chance: 0 },
];

function getRandomCase() {
  const total = cases.reduce((sum, c) => sum + c.chance, 0);
  let rand = Math.random() * total;
  for (const c of cases) {
    if (rand < c.chance) return c;
    rand -= c.chance;
  }
  return cases[0];
}

function createScrollItems(winner) {
  scrollArea.innerHTML = '';
  const items = [];
  for (let i = 0; i < 60; i++) {
    const caseItem = cases[Math.floor(Math.random() * cases.length)];
    items.push(caseItem);
  }
  items.push(winner); // sona winner'ı ekle
  items.forEach((c) => {
    const img = document.createElement('img');
    img.src = `images/${c.name}.jpg`;
    img.className = 'item-img';
    scrollArea.appendChild(img);
  });
  return items;
}

function startRollAnimation(winnerItem) {
  rollSound.currentTime = 0;
  rollSound.play();
  const images = scrollArea.querySelectorAll('img');
  const totalWidth = images.length * 110;
  const winnerIndex = images.length - 1;
  const offset = (winnerIndex * 110) - (scrollArea.clientWidth / 2) + 55;

  scrollArea.style.transition = 'transform 6s cubic-bezier(0.15, 0.6, 0.3, 1)';
  scrollArea.style.transform = `translateX(-${offset}px)`;

  setTimeout(() => {
    showWinner(winnerItem.name);
    saveWinner(winnerItem.name);
  }, 6000);
}

function showWinner(name) {
  winnerImage.src = `images/${name}.jpg`;
  winnerModal.style.display = 'flex';
  setTimeout(() => {
    winnerModal.style.display = 'none';
  }, 4000);
}

function saveWinner(name) {
  fetch('/winner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item: name, date: new Date().toISOString() })
  });
}

openButton.addEventListener('click', () => {
  openButton.disabled = true;
  const winner = getRandomCase();
  createScrollItems(winner);
  setTimeout(() => {
    startRollAnimation(winner);
    setTimeout(() => {
      openButton.disabled = false;
    }, 7000);
  }, 100);
});
