function calculateStats(
    base,
    equipment
){

    const stats = {

        hp:
            base.hp,

        attack:
            base.attack,

        crit:
            base.crit,

        accuracy:
            base.accuracy

    };

    Object.values(
        equipment
    ).forEach(item => {

        if(!item) return;

        stats.hp +=
            item.hp || 0;

        stats.attack +=
            item.attack || 0;

        stats.crit +=
            item.crit || 0;

        stats.accuracy +=
            item.accuracy || 0;

    });

    return stats;

}
