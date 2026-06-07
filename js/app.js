/*
 * Global Data
 */

let classes = [];

let baseStats = {};

let weapons = [];

let armor = [];

let accessories = [];

let weaponTypes = {};

let armorTypes = {};

/*
 * Initialisierung
 */

async function init(){

    try{

        console.log(
            "Loading classes..."
        );

        classes =
            await loadJSON(
                "data/classes.json"
            );

        console.log(
            "Loading base stats..."
        );

        baseStats =
            await loadJSON(
                "data/baseStats.json"
            );

        console.log(
            "Loading weapons..."
        );

        weapons =
            await loadJSON(
                "data/items/weapons.json"
            );

        console.log(
            "Loading armor..."
        );

        armor =
            await loadJSON(
                "data/items/armor.json"
            );

        console.log(
            "Loading weapon types..."
        );

        accessories =
    await loadJSON(
        "data/items/accessories.json"
    );

        weaponTypes =
            await loadJSON(
                "data/weaponTypes.json"
            );

        console.log(
            "Loading armor types..."
        );

        armorTypes =
            await loadJSON(
                "data/armorTypes.json"
            );

        console.log(
            "Creating UI..."
        );

        populateClasses();

        createEquipmentSlots();

        bindEvents();

        updateClassPortrait();

        updateStats();

        console.log(
            "Initialization complete."
        );

    }
    catch(error){

        console.error(
            "Init Fehler:",
            error
        );

    }

}

/*
 * Events
 */

function bindEvents(){

    /*
     * Class Change
     */

    const classSelector =
        document.getElementById(
            "classSelector"
        );

    if(classSelector){

        classSelector.addEventListener(
            "change",
            () => {

                updateClassPortrait();

                updateStats();

            }
        );

    }

    /*
     * Item Search
     */

    const searchInput =
        document.getElementById(
            "itemSearchInput"
        );

    if(searchInput){

        searchInput.addEventListener(
            "input",
            filterModalItems
        );

    }

    /*
     * Modal Close Button
     */

    const closeButton =
        document.getElementById(
            "closeModal"
        );

    if(closeButton){

        closeButton.addEventListener(
            "click",
            closeItemModal
        );

    }

    /*
     * Modal Background Click
     */

    const modal =
        document.getElementById(
            "itemModal"
        );

    if(modal){

        modal.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    modal
                ){

                    closeItemModal();

                }

            }
        );

    }

}

/*
 * Stats aktualisieren
 */

function updateStats(){

    const classId =
        getCurrentClass();

    const stats =
        calculateStats(
            classId
        );

    renderStats(
        stats
    );

}

/*
 * Start
 */

document.addEventListener(
    "DOMContentLoaded",
    init
);
