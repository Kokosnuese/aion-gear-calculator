function createSlot(slotName){

    const slot =
        document.createElement(
            "div"
        );

    slot.className =
        "equipment-slot";

    slot.dataset.slot =
        slotName;

    slot.innerHTML = `

        <div class="slot-icon">

            <img
            src="assets/icons/empty.png">

        </div>

        <div class="slot-content">

            <div class="slot-label">

                ${slotName}

            </div>

            <div class="slot-item">

                Empty

            </div>

        </div>

    `;

    slot.addEventListener(
        "click",
        () => {

            openItemModal(
                slotName
            );

        }
    );

    return slot;

}
