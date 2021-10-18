function loadTurbowarpProject(value) {
    if (!value) {
        return;
    }
    let viewer = document.getElementById("turbowarp-viewer");
    viewer.src = value;
    console.log(value);
}