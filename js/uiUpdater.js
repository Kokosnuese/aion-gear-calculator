function updateSlotUI(
    slot,
    item
){

    const slotElement =
        document.querySelector(

            `[data-slot="${slot}"]`

        );

    if(!slotElement)
        return;

    slotElement
        .querySelector(
            ".slot-item"
        )
        .textContent =
        item.name;

}
