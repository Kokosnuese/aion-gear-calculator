function saveBuild(){

    localStorage.setItem(

        "build",

        JSON.stringify(
            equipment
        )

    );

}

function loadBuild(){

    const build =
        localStorage.getItem(
            "build"
        );

    if(!build)
        return;

    Object.assign(

        equipment,

        JSON.parse(build)

    );

}

function loadBuild(){

    const build =
        localStorage.getItem(
            "build"
        );

    if(!build)
        return;

    Object.assign(

        equipment,

        JSON.parse(build)

    );

}
