const scene = document.querySelector("#rideScene");
const pauseButton = document.querySelector("#toggleRide");
const pauseLabel = document.querySelector("#toggleLabel");
const pauseIcon = pauseButton.querySelector(".pause-icon");
const waterButton = document.querySelector("#waterBreak");
const status = document.querySelector("#rideStatus");
const shotIndex = document.querySelector("#shotIndex");
const shotTitle = document.querySelector("#shotTitle");
const shotProgress = document.querySelector("#shotProgress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const shots = [
  { name: "海岸远景", status: "轮声掠过海岸，下一程向蓝而行。" },
  { name: "低机位跟拍", status: "车轮转起来，海岸线一路向前。" },
  { name: "车轮掠影", status: "阳光从辐条间闪过，路面向后延伸。" },
  { name: "海边补水", status: "停在海风里，醍醐用长喙饮水。" },
  { name: "迎风出发", status: "补足水分，沿着海岸继续前进。" },
];

const shotClasses = ["shot-establish", "shot-follow", "shot-wheel", "shot-water", "shot-accelerate"];
const shotDuration = 3100;
let playing = !reducedMotion.matches;
let drinking = false;
let stage = 0;
let stageTimer;
let drinkTimer;
let manualReturnToPlaying = false;

function clearStageTimer() {
  window.clearTimeout(stageTimer);
}

function setProgress(running) {
  shotProgress.style.animation = "none";
  shotProgress.style.width = "0";
  if (running && !reducedMotion.matches) {
    void shotProgress.offsetWidth;
    shotProgress.style.animation = "shot-progress " + shotDuration + "ms linear both";
  }
  shotProgress.style.animationPlayState = running ? "running" : "paused";
}

function showShot(nextStage) {
  stage = (nextStage + shots.length) % shots.length;
  scene.classList.remove(...shotClasses);
  scene.classList.add(shotClasses[stage]);
  shotIndex.textContent = String(stage + 1).padStart(2, "0");
  shotTitle.textContent = shots[stage].name;
  if (!drinking) status.textContent = shots[stage].status;
  setProgress(playing);

  if (playing && stage === 3 && !reducedMotion.matches) startDrink(false);
}

function scheduleNextShot() {
  clearStageTimer();
  if (!playing || reducedMotion.matches) return;
  stageTimer = window.setTimeout(() => {
    showShot(stage + 1);
    scheduleNextShot();
  }, shotDuration);
}

function startDrink(manual) {
  if (drinking) return;
  drinking = true;
  manualReturnToPlaying = manual && playing;
  clearStageTimer();
  if (manual) {
    showShot(3);
    scene.classList.add("is-paused");
    playing = false;
    setProgress(false);
  }
  scene.classList.add("is-drinking");
  waterButton.disabled = true;
  status.textContent = manual ? "醍醐停在海边，用长喙饮了一口水。" : "停在海风里，醍醐补充一点水分。";
  drinkTimer = window.setTimeout(finishDrink, reducedMotion.matches ? 1200 : 1850);
}

function finishDrink() {
  drinking = false;
  scene.classList.remove("is-drinking");
  waterButton.disabled = false;
  const shouldResume = manualReturnToPlaying;
  manualReturnToPlaying = false;
  if (shouldResume) {
    setPlaying(true);
    return;
  }
  if (!playing) {
    scene.classList.add("is-paused");
    setProgress(false);
  }
  status.textContent = playing ? shots[3].status : "醍醐在海边稍作休息。";
  scheduleNextShot();
}

function setPlaying(nextPlaying) {
  playing = nextPlaying && !reducedMotion.matches;
  scene.classList.toggle("is-paused", !playing);
  scene.classList.toggle("is-playing", playing);
  pauseButton.setAttribute("aria-pressed", String(playing));
  pauseButton.setAttribute("aria-label", playing ? "暂停动画" : "继续动画");
  pauseLabel.textContent = playing ? "暂停动画" : "继续动画";
  pauseIcon.classList.toggle("is-play", !playing);
  setProgress(playing);

  if (playing) {
    scheduleNextShot();
    if (!drinking) status.textContent = shots[stage].status;
  } else {
    clearStageTimer();
    if (!drinking) status.textContent = reducedMotion.matches ? "已减少动态效果，手动补水仍可使用。" : "醍醐在海边稍作休息。";
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
    clearStageTimer();
    if (drinking) {
      window.clearTimeout(drinkTimer);
      drinking = false;
      manualReturnToPlaying = false;
      scene.classList.remove("is-drinking");
      waterButton.disabled = false;
    }
    setPlaying(false);
    status.textContent = "已减少动态效果，手动补水仍可使用。";
  } else {
    setPlaying(true);
  }
});

showShot(0);
setPlaying(playing);
