async function loadClasses(){

    const response =
        await fetch(
            "data/classes.json"
        );

    return await response.json();
}
