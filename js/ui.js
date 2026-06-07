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
function createWeaponSlot(
    weapons
){

    const container =
        document.getElementById(
            "equipmentSlots"
        );

    const div =
        document.createElement(
            "div"
        );

    div.className =
        "slot";

    div.innerHTML = `

        <label>Weapon</label>

        <select id="weaponSelect">

        </select>

    `;

    container.appendChild(
        div
    );

    const select =
        document.getElementById(
            "weaponSelect"
        );

    weapons.forEach(w => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            w.id;

        option.textContent =
            w.name;

        select.appendChild(
            option
        );

    });

}
