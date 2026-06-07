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
