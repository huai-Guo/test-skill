const scene = document.querySelector("#pelicanScene");
const pauseButton = document.querySelector("#toggleAnimation");
const pauseLabel = document.querySelector("#toggleLabel");
const pauseIcon = pauseButton.querySelector(".pause-icon");
const waterButton = document.querySelector("#waterBreak");
const status = document.querySelector("#sceneStatus");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let playing = !reducedMotion.matches;
let drinking = false;
let drinkTimer;
let sipTimer;

function clearRideTimer() {
  window.clearTimeout(drinkTimer);
}

function scheduleDrink() {
  clearRideTimer();
  if (!playing || reducedMotion.matches) return;
  drinkTimer = window.setTimeout(() => startDrink(false), 6400);
}

function startDrink(manual) {
  if (drinking) return;
  clearRideTimer();
  drinking = true;
  scene.classList.add("is-drinking");
  waterButton.disabled = true;
  status.textContent = reducedMotion.matches
    ? "这只鹈鹕停下来，喝了口水。"
    : manual ? "低头啄起一口清水。" : "俯身尝一口清晨的河水。";
  sipTimer = window.setTimeout(finishDrink, reducedMotion.matches ? 1200 : 1900);
}

function finishDrink() {
  drinking = false;
  scene.classList.remove("is-drinking");
  waterButton.disabled = false;
  status.textContent = reducedMotion.matches
    ? "已减少动态效果，手动饮水仍可使用。"
    : playing ? "停下来，听一听水声。" : "在水边歇一会儿。";
  scheduleDrink();
}

function setPlaying(nextPlaying) {
  playing = nextPlaying;
  scene.classList.toggle("is-paused", !playing);
  pauseButton.setAttribute("aria-pressed", String(playing));
  pauseButton.setAttribute("aria-label", playing ? "暂停动画" : "继续动画");
  pauseLabel.textContent = playing ? "暂停动画" : "继续动画";
  pauseIcon.classList.toggle("is-play", !playing);

  if (!drinking) {
    status.textContent = playing
      ? reducedMotion.matches ? "已减少动态效果，手动饮水仍可使用。" : "停下来，听一听水声。"
      : "在水边歇一会儿。";
    scheduleDrink();
  }
}

pauseButton.addEventListener("click", () => setPlaying(!playing));
waterButton.addEventListener("click", () => startDrink(true));

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat) return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || ["BUTTON", "INPUT", "TEXTAREA", "SELECT", "A"].includes(target.tagName))) return;
  event.preventDefault();
  setPlaying(!playing);
});

reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    clearRideTimer();
    if (drinking) {
      window.clearTimeout(sipTimer);
      drinking = false;
      scene.classList.remove("is-drinking");
      waterButton.disabled = false;
    }
    setPlaying(false);
    status.textContent = "已减少动态效果，手动饮水仍可使用。";
  } else {
    setPlaying(true);
  }
});

setPlaying(playing);
