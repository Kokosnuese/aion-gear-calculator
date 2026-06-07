function createSlot(
    slotName
){

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

        <div class="slot-info">

            <div class="slot-name">

                ${slotName}

            </div>

            <div class="slot-item">

                Empty

            </div>

        </div>

        <button
        class="slot-button">

            Select

        </button>

    `;

    const button =
        slot.querySelector(
            ".slot-button"
        );

    button.addEventListener(
        "click",
        () => {

            openItemModal(
                slotName
            );

        }
    );

    return slot;

}
