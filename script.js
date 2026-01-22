/* Mood */
function setMood(m) {
    localStorage.setItem("mood", m);
    document.getElementById("mood").innerText = "Mood: " + m;
}

/* Timer */
let seconds = 0, timer = null;
let total = Number(localStorage.getItem("time")) || 0;

function start() {
    if (timer) return;
    timer = setInterval(() => {
        seconds++;
        updateTime();
    }, 1000);
}

function stop() {
    clearInterval(timer);
    timer = null;
    total += Math.floor(seconds / 60);
    localStorage.setItem("time", total);
    seconds = 0;
    updateTime();
    updateTotal();
}

function updateTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    document.getElementById("time").innerText =
        String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function updateTotal() {
    document.getElementById("total").innerText =
        "Today: " + total + " min";
}

/* Habits */
let habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit() {
    let input = document.getElementById("habitInput");
    if (!input.value) return;
    habits.push({ text: input.value, done: false });
    input.value = "";
    save();
}

function toggle(i) {
    habits[i].done = !habits[i].done;
    save();
}

function render() {
    let list = document.getElementById("habitList");
    list.innerHTML = "";
    habits.forEach((h, i) => {
        let li = document.createElement("li");
        li.innerText = h.text;
        if (h.done) li.classList.add("done");
        li.onclick = () => toggle(i);
        list.appendChild(li);
    });

    let done = habits.filter(h => h.done).length;
    let percent = habits.length ? Math.round(done / habits.length * 100) : 0;
    document.getElementById("progress").innerText =
        percent + "% completed";
}

function save() {
    localStorage.setItem("habits", JSON.stringify(habits));
    render();
}

/* Load */
document.getElementById("mood").innerText =
    "Mood: " + (localStorage.getItem("mood") || "—");
updateTotal();
render();
