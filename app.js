const scene = document.querySelector("#rideScene");
const pauseButton = document.querySelector("#toggleRide");
const pauseLabel = document.querySelector("#toggleLabel");
const pauseIcon = pauseButton.querySelector(".pause-icon");
const waterButton = document.querySelector("#waterBreak");
const status = document.querySelector("#rideStatus");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let playing = true;
let drinking = false;
let rideTimer;

function clearRideTimer() {
  window.clearTimeout(rideTimer);
}

function scheduleWaterBreak() {
  clearRideTimer();
  if (!playing || reducedMotion.matches) return;
  rideTimer = window.setTimeout(() => startWaterBreak(false), 7200);
}

function startWaterBreak(manual) {
  if (drinking) return;
  clearRideTimer();
  drinking = true;
  scene.classList.add("is-drinking");
  waterButton.disabled = true;
  status.textContent = manual ? "咕咚一口，继续慢慢骑。" : "停一下，喝口水再出发。";

  window.setTimeout(finishWaterBreak, 1850);
}

function finishWaterBreak() {
  drinking = false;
  scene.classList.remove("is-drinking");
  waterButton.disabled = false;
  status.textContent = playing ? "骑一会儿，记得喝口水。" : "歇一会儿也很好。";
  scheduleWaterBreak();
}

function setPlaying(nextPlaying) {
  playing = nextPlaying;
  scene.classList.toggle("is-paused", !playing);
  pauseButton.setAttribute("aria-pressed", String(playing));
  pauseButton.setAttribute("aria-label", playing ? "暂停动画" : "继续动画");
  pauseLabel.textContent = playing ? "暂停动画" : "继续动画";
  pauseIcon.classList.toggle("is-play", !playing);

  if (!drinking) {
    status.textContent = playing ? "骑一会儿，记得喝口水。" : "歇一会儿也很好。";
    scheduleWaterBreak();
  }
}

pauseButton.addEventListener("click", () => setPlaying(!playing));
waterButton.addEventListener("click", () => startWaterBreak(true));

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
    status.textContent = "已为你减少动态效果，喝水按钮仍然可以使用。";
  } else {
    scheduleWaterBreak();
    status.textContent = playing ? "骑一会儿，记得喝口水。" : "歇一会儿也很好。";
  }
});

scheduleWaterBreak();
