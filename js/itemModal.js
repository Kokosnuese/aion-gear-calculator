let currentSlot = null;

function openItemModal(
    slot
){

    currentSlot = slot;

    const modal =
        document.getElementById(
            "itemModal"
        );

    modal.style.display =
        "block";

    loadItemsForSlot(
        slot
    );

}
