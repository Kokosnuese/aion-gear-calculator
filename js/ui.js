function createEquipmentSlots(){

    const leftSlots = [

        "helmet",

        "weapon",

        "chest",

        "gloves",

        "pants",

        "boots"

    ];

    const rightSlots = [

        "necklace",

        "earring1",

        "earring2",

        "ring1",

        "ring2",

        "belt"

    ];

    const left =
        document.getElementById(
            "leftGearColumn"
        );

    const right =
        document.getElementById(
            "rightGearColumn"
        );

    left.innerHTML = "";
    right.innerHTML = "";

    leftSlots.forEach(slot => {

        left.appendChild(
            createSlot(slot)
        );

    });

    rightSlots.forEach(slot => {

        right.appendChild(
            createSlot(slot)
        );

    });

}
