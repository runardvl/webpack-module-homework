import "./index.scss";

const weatherType = ["sun", "rain", "snow"];

const icons = {
  sun: "assets/icons/sun.svg",
  rain: "assets/icons/cloud-rain.svg",
  snow: "assets/icons/cloud-snow.svg",
  pause: "assets/icons/pause.svg",
};

const backgrounds = {
  sun: "assets/summer-bg.jpg",
  rain: "assets/rainy-bg.jpg",
  snow: "assets/winter-bg.jpg",
};

const sounds = {
  sun: "assets/sounds/summer.mp3",
  rain: "assets/sounds/rain.mp3",
  snow: "assets/sounds/winter.mp3",
};

function createButton(name, iconPath) {
  const btn = document.createElement("button");
  btn.classList.add("sound-button");
  btn.setAttribute("id", `${name}Btn`);
  btn.setAttribute("data-name", name);
  btn.style.backgroundImage = `url(${backgrounds[name]})`;

  const icon = document.createElement("img");
  icon.classList.add("control-icon");
  icon.src = iconPath;

  btn.append(icon);

  return btn;
}

const app = document.getElementById("app");
const heading = document.createElement("h1");
const controls = document.createElement("div");
const volumeControl = document.createElement("div");
const range = document.createElement("input");

heading.innerText = "Weather sounds";
app.append(heading);

controls.setAttribute("id", "controls");
app.append(controls);

weatherType.forEach((type) => {
  const btn = createButton(type, icons[type]);
  controls.append(btn);
});

volumeControl.classList.add("volume-control");

range.setAttribute("type", "range");
range.setAttribute("id", "volume");
range.setAttribute("min", "0");
range.setAttribute("max", "1");
range.setAttribute("step", "0.01");
range.setAttribute("value", "0.5");

volumeControl.append(range);

app.append(volumeControl);

let currentAudio,
  activeBtn = null;

function toggleSound(soundKey, btn) {
  if (currentAudio && !currentAudio.paused && activeBtn === btn) {
    currentAudio.pause();
    btn.querySelector("img").src = icons[btn.dataset.name];
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
    activeBtn.querySelector("img").src = icons[activeBtn.dataset.name];
  }

  currentAudio = new Audio(sounds[soundKey]);
  currentAudio.volume = 0.5;
  currentAudio.play();

  app.style.backgroundImage = `url(${backgrounds[btn.dataset.name]})`;

  btn.querySelector("img").src = icons.pause;
  activeBtn = btn;
}

document.querySelectorAll(".sound-button").forEach((button) => {
  button.addEventListener("click", () => {
    const soundKey = button.dataset.name;
    toggleSound(soundKey, button);
  });
});

volumeControl.addEventListener("input", (e) => {
  if (!currentAudio) {
    return;
  }
  currentAudio.volume = e.target.value;
});
