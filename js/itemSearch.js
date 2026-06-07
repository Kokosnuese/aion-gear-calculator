function searchItems(
    items,
    term
){

    return items.filter(item =>

        item.name
        .toLowerCase()
        .includes(
            term.toLowerCase()
        )

    );

}
