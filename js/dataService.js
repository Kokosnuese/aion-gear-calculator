async function loadJSON(path){

    const response =
        await fetch(path);

    return await response.json();

}
function getArmorForClass(
    slot,
    classId
){

    const armorType =
        armorTypes[classId];

    return armor.filter(

        item =>

            item.slot === slot &&

            item.armorType ===
            armorType

    );

}
function getAccessoriesForSlot(slot){

    switch(slot){

        case "ring1":
        case "ring2":

            return accessories.filter(
                item =>
                    item.slot ===
                    "ring"
            );

        case "earring1":
        case "earring2":

            return accessories.filter(
                item =>
                    item.slot ===
                    "earring"
            );

        case "necklace":

            return accessories.filter(
                item =>
                    item.slot ===
                    "necklace"
            );

        case "belt":

            return accessories.filter(
                item =>
                    item.slot ===
                    "belt"
            );

        default:

            return [];

    }

}
