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
