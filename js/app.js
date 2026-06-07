let classes;

let baseStats;

let weapons;

let armor;

let equipment = {

    weapon:null,

    helmet:null,

    chest:null

};

async function init(){

    classes =
        await loadJSON(
            "data/classes.json"
        );

    baseStats =
        await loadJSON(
            "data/baseStats.json"
        );

    weapons =
        await loadJSON(
            "data/items/weapons.json"
        );

    armor =
        await loadJSON(
            "data/items/armor.json"
        );

    populateClasses();

    createWeaponSlot(
        weapons
    );

    bindEvents();

    updateStats();

}

function populateClasses(){

    const selector =
        document.getElementById(
            "classSelector"
        );

    classes.forEach(c => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            c.id;

        option.textContent =
            c.name;

        selector.appendChild(
            option
        );

    });

}

function bindEvents(){

    document
    .getElementById(
        "weaponSelect"
    )
    .addEventListener(
        "change",
        updateStats
    );

    document
    .getElementById(
        "classSelector"
    )
    .addEventListener(
        "change",
        updateStats
    );

}

function updateStats(){

    const classId =
        document.getElementById(
            "classSelector"
        ).value;

    const weaponId =
        parseInt(
            document.getElementById(
                "weaponSelect"
            ).value
        );

    equipment.weapon =
        weapons.find(
            w => w.id === weaponId
        );

    const stats =
        calculateStats(

            baseStats[classId],

            equipment

        );

    renderStats(stats);

}

init();async function init(){

    const classes =
        await loadClasses();

    const selector =
        document.getElementById(
            "classSelector"
        );

    classes.forEach(c => {

        const option =
            document.createElement(
                "option"
            );

        option.value = c.id;

        option.textContent =
            c.name;

        selector.appendChild(
            option
        );

    });

    createEquipmentSlots();

}

init();console.log("Aion 4 Builder gestartet");
