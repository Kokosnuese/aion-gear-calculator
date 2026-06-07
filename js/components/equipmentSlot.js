
const slotIcons = {

    helmet:
        "assets/ui/Helmet.png",

    shoulders:
        "assets/ui/Shoulder.png",

    weapon:
        "assets/ui/Weapon.png",

    chest:
        "assets/ui/Breast.png",

    gloves:
        "assets/ui/Glove.png",

    pants:
        "assets/ui/Pants.png",

    boots:
        "assets/ui/Shoes.png",

    necklace:
        "assets/ui/Necklaces.png",

    earring1:
        "assets/ui/EarringL.png",

    earring2:
        "assets/ui/EarringR.png",

    ring1:
        "assets/ui/RingL.png",

    ring2:
        "assets/ui/RingR.png",

    belt:
        "assets/ui/Belt.png"

};

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
