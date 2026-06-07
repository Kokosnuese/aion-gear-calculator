function openItemModal(slot){

    console.log(
        "Select item for",
        slot
    );

}
function filterModalItems(){

    const search =
        document
        .getElementById(
            "itemSearchInput"
        )
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll(
            ".item-row"
        );

    rows.forEach(row => {

        row.style.display =

            row.textContent
            .toLowerCase()
            .includes(search)

            ? ""

            : "none";

    });

}
