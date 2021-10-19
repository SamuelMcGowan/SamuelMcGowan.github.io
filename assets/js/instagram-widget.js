function openImageViewer(src) {
    let mask = document.getElementById("mask");
    let viewer = document.getElementById("instagram-widget-viewer");
    mask.style.display = "block";
    viewer.src = src;
    viewer.style.display = "block";
    viewer.style.opacity = "1";
}

function closeImageViewer() {
    let mask = document.getElementById("mask");
    let viewer = document.getElementById("instagram-widget-viewer");

    mask.style.display = "none";
    viewer.style.display = "none";
    viewer.style.opacity = "0";
    viewer.src = "";
}