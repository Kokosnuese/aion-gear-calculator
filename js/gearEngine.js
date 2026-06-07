function calculateStats(classId){

    const stats = {

        ...(baseStats[classId] || {})

    };

    Object.values(
        equipment
    ).forEach(item => {

        if(
            !item ||
            !item.stats
        ){
            return;
        }

        Object.entries(
            item.stats
        ).forEach(

            ([key,value]) => {

                stats[key] =

                    (stats[key] || 0)

                    + value;

            }

        );

    });

    return stats;

}
