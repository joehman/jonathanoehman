
const html = document.getElementsByTagName("html")[0];
const body = document.getElementsByTagName("body")[0];

function makeAllDraggable() {
    const windows = document.querySelectorAll(".draggable");

    let count = windows.length;

    windows.forEach((win) => {
        const handle = win.querySelector(".titlebar");

        win.style.zIndex = "2";

        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        handle.addEventListener("mousedown", (e) => {
            windows.forEach((winl) => {
                winl.style.zIndex = "1";
            })
            win.style.zIndex = "2";


            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;

            let nextX = e.clientX - offsetX;
            let nextY = e.clientY - offsetY;

            if (nextX >= 0) {
                win.style.left = e.clientX - offsetX + "px";
            }
            if (nextY >= 0) {
                win.style.top = e.clientY - offsetY + "px";
            }
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    });
}

makeAllDraggable();

const snusclickerbutton = document.getElementById("snusclickerbutton");
const oscarsnusclickerbutton = document.getElementById("oscarsnusclickerbutton")

const mapquizbutton = document.getElementById("mapquizbutton");


snusclickerbutton.onclick = () => {
    location.href = "snusclicker/snusclicker.html";
}
mapquizbutton.onclick = () => {
    location.href = "mapquiz/index.html";
}
oscarsnusclickerbutton.onclick = () => {
    location.href = "vendor/oscarsnusclicker/index.html"
}
