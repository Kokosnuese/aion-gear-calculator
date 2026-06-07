/*
 * Global Data
 */

let classes = [];

let baseStats = {};

let weapons = [];

let armor = [];

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
);let classes;
let baseStats;
let weapons;
let armor;

/*
 * Initialisierung
 */
async function init(){

    try{

        console.log("1 classes");
        classes =
            await loadJSON(
                "data/classes.json"
            );

        console.log("2 baseStats");
        baseStats =
            await loadJSON(
                "data/baseStats.json"
            );

        console.log("3 weapons");
        weapons =
            await loadJSON(
                "data/items/weapons.json"
            );

        console.log("4 armor");
        armor =
            await loadJSON(
                "data/items/armor.json"
            );

        console.log("5 populateClasses");

        populateClasses();

        createEquipmentSlots();

        refreshWeaponList();

        bindEvents();

        updateStats();

    }
    catch(error){

        console.error(
            "Init Fehler:",
            error
        );

    }

}

/*
 * Klassen Dropdown füllen
 */
function populateClasses(){

    const selector =
        document.getElementById(
            "classSelector"
        );

    selector.innerHTML = "";

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

/*
 * Waffen für aktuelle Klasse filtern
 */
function getWeaponsForClass(
    classId
){

    return weapons.filter(
        weapon => {

            if(!weapon.class)
                return false;

            return weapon.class.includes(
                classId
            );

        }
    );

}

/*
 * Waffenliste neu aufbauen
 */
function refreshWeaponList(){

    const classId =
        document.getElementById(
            "classSelector"
        ).value;

    const filteredWeapons =
        getWeaponsForClass(
            classId
        );

    const select =
        document.getElementById(
            "weaponSelect"
        );

    if(!select)
        return;

    select.innerHTML = "";

    filteredWeapons.forEach(
        weapon => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                weapon.id;

            option.textContent =
                weapon.name;

            select.appendChild(
                option
            );

        }
    );

}

/*
 * Event Handler registrieren
 */
function bindEvents(){

    const classSelector =
        document.getElementById(
            "classSelector"
        );

    classSelector.addEventListener(
        "change",
        () => {

            refreshWeaponList();

            updateStats();

        }
    );

    const weaponSelect =
        document.getElementById(
            "weaponSelect"
        );

    if(weaponSelect){

        weaponSelect.addEventListener(
            "change",
            updateStats
        );

    }
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

}

/*
 * Aktuelle Ausrüstung sammeln
 */
function collectEquipment(){

    const weaponSelect =
        document.getElementById(
            "weaponSelect"
        );

    if(
        weaponSelect &&
        weaponSelect.value
    ){

        const weaponId =
            parseInt(
                weaponSelect.value
            );

        equipment.weapon =
            weapons.find(
                w =>
                    w.id === weaponId
            );

    }
    else{

        equipment.weapon =
            null;

    }

}

/*
 * Stats neu berechnen
 */
function updateStats(){

    const classId =
        document.getElementById(
            "classSelector"
        ).value;

    if(
        !baseStats[classId]
    ){
        return;
    }

    collectEquipment();

    const stats =
        calculateStats(

            baseStats[classId],

            equipment

        );

    renderStats(
        stats
    );

}

/*
 * Build speichern
 */
function saveCurrentBuild(){

    localStorage.setItem(

        "currentBuild",

        JSON.stringify(
            equipment
        )

    );

}

/*
 * Build laden
 */
function loadCurrentBuild(){

    const build =
        localStorage.getItem(
            "currentBuild"
        );

    if(!build)
        return;

    try{

        const parsed =
            JSON.parse(
                build
            );

        Object.assign(
            equipment,
            parsed
        );

    }
    catch(error){

        console.error(
            error
        );

    }

}


/*
 * Start
 */
init();
