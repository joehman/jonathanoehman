function makeAllDraggable() {
    const windows = document.querySelectorAll(".draggable");

    windows.forEach((win) => {
        const handle = win.querySelector(".titlebar");

        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        handle.addEventListener("mousedown", (e) => {
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
            
            if (nextX >= 0 && nextY >= 0)
            {
                win.style.left = e.clientX - offsetX + "px";
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