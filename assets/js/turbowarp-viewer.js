function loadTurbowarpProject(value_json) {
    let turbowarp = document.getElementById("turbowarp");
    let viewer = document.getElementById("turbowarp-viewer");
    let descr = document.getElementById("turbowarp-descr");

    if (!value_json) {
        viewer.src = "";
        turbowarp.style.display = "none";
        return;
    }

    console.log(value_json);

    let value = JSON.parse(value_json);
    console.log(value);

    viewer.src = value.link;
    descr.innerText = value.descr;

    turbowarp.style.display = "block";
}