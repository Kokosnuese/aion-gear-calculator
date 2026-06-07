function getCurrentClass(){

    return document
        .getElementById(
            "classSelector"
        )
        .value;

}

function onClassChange(){

    updateClassPortrait();

    refreshWeaponList();

    updateStats();

}

function bindClassEvents(){

    document
        .getElementById(
            "classSelector"
        )
        .addEventListener(
            "change",
            onClassChange
        );

}
