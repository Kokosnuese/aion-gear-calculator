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

    <div class="tooltip-name">

        ${item.name}

    </div>

    <hr>

    Attack:
    ${item.stats.attack || 0}

    <br>

    Crit:
    ${item.stats.crit || 0}

    <br>

    Accuracy:
    ${item.stats.accuracy || 0}

`;

    tooltip.style.left =
        x + "px";

    tooltip.style.top =
        y + "px";

    tooltip.style.display =
        "block";

}
