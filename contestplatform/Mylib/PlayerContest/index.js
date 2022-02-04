/**
 * retrive's player info for a contest
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idContest 
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function getPlayerInfoContest(supabase, idContest, idUser) {
    let { data: profiles_contest, error } = await supabase
        .from('profiles_contest')
        .select("*")
        .eq('fk_profiles', idUser)
        .eq('fk_contest', idContest)
    return (
        { profiles_contest, error }
    )
}

/**
 * retrive's all profile contest info for a user
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function getProfileContestByUserID(supabase, idUser) {
    let { data, error } = await supabase
        .from('profiles_contest')
        .select("fk_contest")
        // Filters
        .eq('fk_profiles', idUser)
    return (
        { data, error }
    )
}


/**
 * insert a player in a contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idContest 
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function insertPlayerInContest(supabase, idContest, idUser) {
    const { data, error } = await supabase
        .from('profiles_contest')
        .insert([
            { fk_profiles: idUser, fk_contest: idContest },
        ])
    return (
        { data, error }
    )
}

/**
 * update a player information in a contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} updates 
 * @param {int} id_pro_con 
 * @returns { data, error }
 */
export async function updateContestForUser(supabase, updates, id_pro_con) {

    const FIRSTPRICE = 15;
    const SECONDPRICE = 10;
    const THIRDPRICE = 5;

    //get all user profile in the contest
    let { data: profiles_contest, error2 } = await supabase
        .from('profiles_contest')
        .select('*')
        .eq("fk_contest", updates.fk_contest)

    //sort with capital gain
    profiles_contest.sort((a, b) => (a.capitalGain < b.capitalGain) ? 1 : -1)

    //condition if top 3 else no lines to mod.

    // if(profiles_contest.at(2) != null && updates.capitalGain<profiles_contest.at(2)){

    // }else{
    //     const { data, errorADDUserContest } = await supabase
    //     .from('profiles_contest')
    //     .update(updates)
    //     .eq("id_pro_con", id_pro_con)
    // }

    //remove all 1 2 3 prices
    removePriceContestClassement(supabase, 
        (profiles_contest.at(0) != null && profiles_contest.at(0).submitDate !=null )? profiles_contest.at(0).fk_profiles : null, 
        FIRSTPRICE)
    removePriceContestClassement(supabase, 
        (profiles_contest.at(1) != null && profiles_contest.at(1).submitDate !=null ) ? profiles_contest.at(1).fk_profiles : null, 
        SECONDPRICE)
    removePriceContestClassement(supabase, 
        (profiles_contest.at(2) != null && profiles_contest.at(2).submitDate !=null) ? profiles_contest.at(2).fk_profiles : null, 
        THIRDPRICE)


    //add participation Tars
    const { data, errorADDUserContest } = await supabase
        .from('profiles_contest')
        .update(updates)
        .eq("id_pro_con", id_pro_con)

     //get all user profile in the contest
    let { data: profiles_contest2 } = await supabase
        .from('profiles_contest')
        .select('*')
        .eq("fk_contest", updates.fk_contest)

        //sort all contest'profile
    profiles_contest2.sort((a, b) => (a.capitalGain < b.capitalGain) ? 1 : -1)

    // console.log(profiles_contest2);
    // //add price for 1 2 3 position
    addPriceContestClassement(supabase, profiles_contest2.at(0) != null  ? profiles_contest2.at(0).fk_profiles : null,
     FIRSTPRICE)
    addPriceContestClassement(supabase, profiles_contest2.at(1) != null? profiles_contest2.at(1).fk_profiles : null,
     SECONDPRICE)
    addPriceContestClassement(supabase, profiles_contest2.at(2) != null  ? profiles_contest2.at(2).fk_profiles : null,
     THIRDPRICE)

    //save current situation
    let { data: profiles_contest3, error4 } = await supabase
        .from('profiles_contest')
        .select('*')
        .eq("fk_contest", updates.fk_contest)

    //return all profile in the contest and the error if there is one or null
    return (
        { profiles_contest3, errorADDUserContest }
    )
}

/**
 * remove price in contest for profile given.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} fk_profiles 
 * @param {int} price 
 */
async function removePriceContestClassement(supabase, fk_profiles, price) {
    console.log("remove");
    if (fk_profiles != null) {
        
        //get old pointGeneral
        let { data: profiles } = await supabase
            .from('profiles')
            .select('pointGeneral')
            .eq('id', fk_profiles)
        if (profiles != null) {
            await supabase
                .from('profiles')
                .update({ pointGeneral: profiles.at(0).pointGeneral - price })
                .eq('id', fk_profiles)
        }
    }
}


/**
 * remove price in contest for profile given.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} fk_profiles 
 * @param {int} price 
 */
async function addPriceContestClassement(supabase, fk_profiles, price) {

    if (fk_profiles != null) {
        //get old pointGeneral
        let { data: profiles } = await supabase
            .from('profiles')
            .select('pointGeneral')
            .eq('id', fk_profiles)
        if (profiles != null) {
            await supabase
                .from('profiles')
                .update({ pointGeneral: profiles.at(0).pointGeneral + price })
                .eq('id', fk_profiles)
        }
    }
}


