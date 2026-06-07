function calculateStats(base,equipment){

    const stats = {

        hp: base.hp,
        attack: base.attack,
        crit: base.crit,
        accuracy: base.accuracy

    };

    Object.values(equipment).forEach(item => {

        if(!item) return;

        if(item.stats){

            stats.hp += item.stats.hp || 0;

            stats.attack +=
                item.stats.attack || 0;

            stats.crit +=
                item.stats.crit || 0;

            stats.accuracy +=
                item.stats.accuracy || 0;
        }

    });

    return stats;

}
