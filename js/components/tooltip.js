function showTooltip(
    item,
    x,
    y
){

    const tooltip =
        document.getElementById(
            "tooltip"
        );

    tooltip.innerHTML = `

        <strong>

        ${item.name}

        </strong>

        <br>

        Attack:

        ${item.stats.attack || 0}

        <br>

        Crit:

        ${item.stats.crit || 0}

    `;

    tooltip.style.left =
        x + "px";

    tooltip.style.top =
        y + "px";

    tooltip.style.display =
        "block";

}
