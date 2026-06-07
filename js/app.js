async function init(){

    const classes =
        await loadClasses();

    const selector =
        document.getElementById(
            "classSelector"
        );

    classes.forEach(c => {

        const option =
            document.createElement(
                "option"
            );

        option.value = c.id;

        option.textContent =
            c.name;

        selector.appendChild(
            option
        );

    });

    createEquipmentSlots();

}

init();console.log("Aion 4 Builder gestartet");
