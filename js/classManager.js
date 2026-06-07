function getCurrentClass(){

    const selector =
        document.getElementById(
            "classSelector"
        );

    return selector
        ? selector.value
        : "gladiator";

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
