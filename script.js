/* THEME */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* MOOD */
function setMood(m) {
  localStorage.setItem("mood", m);
  if (document.getElementById("moodText"))
    document.getElementById("moodText").innerText = "Mood: " + m;
}

/* TIMER */
let seconds = 0, timer = null;
let total = Number(localStorage.getItem("time")) || 0;

function start() {
  if (timer) return;
  document.getElementById("time").classList.add("timer-running");
  timer = setInterval(() => {
    seconds++;
    updateTime();
  }, 1000);
}

function stop() {
  clearInterval(timer);
  timer = null;
  document.getElementById("time").classList.remove("timer-running");
  total += Math.floor(seconds / 60);
  localStorage.setItem("time", total);
  seconds = 0;
  updateTime();
  updateTotal();
}

function updateTime() {
  if (!document.getElementById("time")) return;
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  document.getElementById("time").innerText =
    String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
}

function updateTotal() {
  if (document.getElementById("totalTime"))
    document.getElementById("totalTime").innerText =
      "Today: " + total + " min";
}

/* HABITS */
let habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit() {
  let input = document.getElementById("habitInput");
  if (!input.value) return;
  habits.push({ text: input.value, done: false });
  input.value = "";
  saveHabits();
}

function toggleHabit(i) {
  habits[i].done = !habits[i].done;
  saveHabits();
}

function renderHabits() {
  let list = document.getElementById("habitList");
  if (!list) return;
  list.innerHTML = "";
  habits.forEach((h,i)=>{
    let li = document.createElement("li");
    li.innerText = h.text;
    if (h.done) li.classList.add("done");
    li.onclick = ()=>toggleHabit(i);
    list.appendChild(li);
  });

  let done = habits.filter(h=>h.done).length;
  let percent = habits.length ? Math.round(done/habits.length*100) : 0;
  document.getElementById("progress").innerText = percent+"% completed";
}

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

/* DASHBOARD */
function loadDashboard() {
  if (document.getElementById("dashMood"))
    document.getElementById("dashMood").innerText =
      "Mood: " + (localStorage.getItem("mood") || "—");

  if (document.getElementById("dashTime"))
    document.getElementById("dashTime").innerText =
      "Focus: " + total + " min";

  let done = habits.filter(h=>h.done).length;
  let percent = habits.length ? Math.round(done/habits.length*100) : 0;
  if (document.getElementById("dashHabits"))
    document.getElementById("dashHabits").innerText =
      "Habits: " + percent + "%";
}

/* INIT */
updateTotal();
renderHabits();
loadDashboard();
