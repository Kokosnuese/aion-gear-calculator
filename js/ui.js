function createEquipmentSlots(){

    const slots = [

        "weapon",

        "helmet",

        "chest",

        "gloves",

        "pants",

        "boots",

        "necklace",

        "earring1",

        "earring2",

        "ring1",

        "ring2",

        "belt"

    ];

    const container =
        document.getElementById(
            "equipmentSlots"
        );

    container.innerHTML = "";

    slots.forEach(slot => {

        container.appendChild(

            createSlot(slot)

        );

    });

}
