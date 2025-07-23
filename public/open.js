document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("openButton");
  const scrollArea = document.querySelector(".scroll-area");
  const modal = document.querySelector(".winner-modal");
  const modalImg = modal.querySelector("img");

  const items = [
    { name: "recoil", img: "images/recoil.jpg", chance: 60 },
    { name: "fracture", img: "images/fracture.jpg", chance: 27 },
    { name: "revolution", img: "images/revolution.jpg", chance: 0.05 },
    { name: "kilowatt", img: "images/kilowatt.jpg", chance: 4 },
    { name: "tickettohell", img: "images/tickettohell.jpg", chance: 3 },
    { name: "gallery", img: "images/gallery.jpg", chance: 0.05 },
    { name: "chroma2", img: "images/chroma2.jpg", chance: 0 },
    { name: "vogue", img: "images/vogue.jpg", chance: 0 },
  ];

  const audio = new Audio("sounds/open.mp3");

  let allImagesLoaded = false;

  function preloadImages(images, callback) {
    let loaded = 0;
    images.forEach(item => {
      const img = new Image();
      img.src = item.img;
      img.onload = () => {
        loaded++;
        if (loaded === images.length) {
          callback();
        }
      };
      img.onerror = () => {
        console.error("Resim yüklenemedi:", item.img);
        loaded++;
        if (loaded === images.length) {
          callback();
        }
      };
    });
  }

  function pickWinner() {
    const rand = Math.random() * 100;
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i].chance;
      if (rand <= sum) {
        return items[i];
      }
    }
    return items[0]; // fallback
  }

  function createScrollItems(targetItem) {
    const fullList = [];
    const scrollCount = 50; // toplam dönme item sayısı
    for (let i = 0; i < scrollCount - 1; i++) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      fullList.push(randomItem);
    }
    fullList.push(targetItem);
    return fullList;
  }

  function startScrollAnimation(itemList, targetItem) {
    scrollArea.innerHTML = "";
    itemList.forEach(item => {
      const img = document.createElement("img");
      img.src = item.img;
      img.className = "item-img";
      scrollArea.appendChild(img);
    });

    const totalItems = itemList.length;
    const itemWidth = 104; // 100px + 2x margin (2px+2px)
    const scrollDistance = itemWidth * totalItems - (itemWidth * 2);

    scrollArea.style.transition = "transform 6s cubic-bezier(0.1, 0.9, 0.3, 1)";
    scrollArea.style.transform = `translateX(-${scrollDistance}px)`;

    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      modal.style.display = "flex";
      modalImg.src = targetItem.img;
    }, 6000); // Scroll bitince modal göster
  }

  preloadImages(items, () => {
    allImagesLoaded = true;
    openButton.disabled = false;
  });

  openButton.addEventListener("click", () => {
    if (!allImagesLoaded) return;

    openButton.disabled = true;
    modal.style.display = "none";

    const winner = pickWinner();
    const scrollList = createScrollItems(winner);

    // animasyon başlat
    startScrollAnimation(scrollList, winner);

    setTimeout(() => {
      openButton.disabled = false;
    }, 7000); // Yeni deneme için süre
  });

  // Modal kapamak için tıklama
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
