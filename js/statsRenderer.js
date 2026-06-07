function renderStats(stats){

    const container =
        document.getElementById(
            "statsList"
        );

    container.innerHTML = "";

    Object.entries(stats)
    .forEach(([key,value]) => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "stat-row";

        row.innerHTML = `

            <span>${key}</span>

            <span>${value}</span>

        `;

        container.appendChild(
            row
        );

    });

}
