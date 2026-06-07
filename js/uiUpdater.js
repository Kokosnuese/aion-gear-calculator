function updateSlotUI(
    slot,
    item
){

    const element =
        document.querySelector(

            `[data-slot="${slot}"]`

        );

    if(!element)
        return;

    /*
     * Vorherige Auswahl entfernen
     */

    document
        .querySelectorAll(
            ".equipment-slot"
        )
        .forEach(slotElement => {

            slotElement.classList.remove(
                "selected-slot"
            );

        });

    /*
     * Aktuellen Slot markieren
     */

    element.classList.add(
        "selected-slot"
    );

    /*
     * Itemname setzen
     */

    const itemLabel =
        element.querySelector(
            ".slot-item"
        );

    if(itemLabel){

        itemLabel.textContent =
            item.name;

    }

    /*
     * Itemicon setzen
     */

    const icon =
        element.querySelector(
            "img"
        );

    if(
        icon &&
        item.icon
    ){

        icon.src =
            "assets/icons/" +
            item.icon;

    }

}function updateSlotUI(
    slot,
    item
){

    const element =
        document.querySelector(

            `[data-slot="${slot}"]`

        );

    if(!element)
        return;

    element
        .querySelector(
            ".slot-item"
        )
        .textContent =
        item.name;

    const icon =
        element.querySelector(
            "img"
        );

    icon.src =
        "assets/icons/" +
        item.icon;

}
