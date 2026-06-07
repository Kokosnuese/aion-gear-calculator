function createEquipmentSlots(){

    const slots = [

        "Weapon",
        "Sub Weapon",

        "Helmet",
        "Shoulders",
        "Chest",
        "Gloves",
        "Pants",
        "Boots",

        "Necklace",

        "Earring 1",
        "Earring 2",

        "Ring 1",
        "Ring 2",

        "Belt",

        "Title",
        "Food",
        "Scroll"

    ];

    const container =
        document.getElementById(
            "equipmentSlots"
        );

    slots.forEach(slot => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "slot";

        div.textContent =
            slot;

        container.appendChild(
            div
        );

    });

}
