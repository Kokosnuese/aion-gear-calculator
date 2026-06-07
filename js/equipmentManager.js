const equipment = {

    weapon:null,

    subWeapon:null,

    helmet:null,

    shoulders:null,

    chest:null,

    gloves:null,

    pants:null,

    boots:null,

    necklace:null,

    earring1:null,

    earring2:null,

    ring1:null,

    ring2:null,

    belt:null

};

function equipItem(
    slot,
    item
){

    equipment[slot] = item;

    updateSlotUI(
        slot,
        item
    );

    updateStats();

    saveCurrentBuild();

}
