async function loadClasses(){

    const response =
        await fetch(
            "data/classes.json"
        );

    return await response.json();
}

function updateClassPortrait(){

    const classId =
        document
        .getElementById(
            "classSelector"
        )
        .value;

    const img =
        document.getElementById(
            "characterImage"
        );

    if(
        classPortraits[classId]
    ){

        img.src =
            classPortraits[classId];

    }

}
