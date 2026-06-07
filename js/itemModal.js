let currentSlot = null;

let currentItems = [];

/*
 * Modal öffnen
 */
function openItemModal(slot){

    currentSlot = slot;

    const modal =
        document.getElementById(
            "itemModal"
        );

    modal.style.display =
        "block";

    loadItemsForSlot(
        slot
    );

}

/*
 * Modal schließen
 */
function closeItemModal(){

    const modal =
        document.getElementById(
            "itemModal"
        );

    modal.style.display =
        "none";

}

/*
 * Items für Slot laden
 */
function loadItemsForSlot(slot){

    let items = [];

    switch(slot){

        case "weapon":

            const classId =
                document
                .getElementById(
                    "classSelector"
                )
                .value;

            items =
                getWeaponsForClass(
                    classId
                );

            break;

        case "helmet":

            items =
                armor.filter(
                    item =>
                        item.slot ===
                        "helmet"
                );

            break;

        case "chest":

            items =
                armor.filter(
                    item =>
                        item.slot ===
                        "chest"
                );

            break;

        default:

            items = [];

    }

    currentItems =
        items;

    renderItemList(
        items
    );

}

/*
 * Itemliste rendern
 */
function renderItemList(items){

    const results =
        document.getElementById(
            "itemResults"
        );

    if(!results)
        return;

    results.innerHTML = "";

    items.forEach(item => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "item-row";

        row.innerHTML = `

            <img
            src="assets/icons/${item.icon}"
            width="32"
            height="32">

            <span>

                ${item.name}

            </span>

        `;

        row.addEventListener(
            "click",
            () => {

                console.log(
                    "Equip:",
                    currentSlot,
                    item
                );

                equipItem(
                    currentSlot,
                    item
                );

                closeItemModal();

            }
        );

        results.appendChild(
            row
        );

    });

}

/*
 * Suchfunktion
 */
function filterModalItems(){

    const searchInput =
        document.getElementById(
            "itemSearchInput"
        );

    if(!searchInput)
        return;

    const term =
        searchInput.value;

    const filteredItems =

        searchItems(
            currentItems,
            term
        );

    renderItemList(
        filteredItems
    );

}
