let currentSlot = null;

function openItemModal(
    slot
){

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
function loadItemsForSlot(
    slot
){

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

        case "chest":

            items =
                armor.filter(
                    item =>
                    item.slot === slot
                );

            break;

    }

    renderItemList(
        items
    );

}

function renderItemList(
    items
){

    const results =
        document.getElementById(
            "itemResults"
        );

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
            width="32">

            ${item.name}

        `;

        row.addEventListener(
            "click",
            () => {

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
