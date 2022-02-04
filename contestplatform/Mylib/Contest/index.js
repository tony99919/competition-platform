
/**
 * get all infos for one contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getConstest(supabase, idContest) {
    let { data, error } = await supabase.from('contest')
        .select(`
        id, title, startDate, endDate, description, price, 
        cryptoMonnaie (
          name
        ),
        category (
          name
        )
      `)
        .eq('id', idContest)
    return (
        { data, error }
    )
}

/**
 * get number of player for one contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idContest 
 * @returns { count }
 */
export async function getNbPlayer(supabase, idContest) {
    const { count } = await supabase
        .from('profiles_contest')
        .select('*', { count: 'exact' })
        .eq('fk_contest', idContest)
    return (
        { count }
    )
}
/**
 * get all of player for one contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getPlayer(supabase, idContest) {
    let { data, error } = await supabase
        .from('profiles_contest')
        .select(`*,     profiles (
        username, id
        )`)
        .eq('fk_contest', idContest)
    return (
        { data, error }
    )
}

/**
 * get all id contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getIdContest(supabase) {
    let { data, error } = await supabase
        .from('contest')
        .select(`
      id
    `)
    return (
        { data, error }
    )
}

/**
 * get all crypto.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getAllCrypto(supabase) {
    let { data, error } = await supabase
        .from('cryptoMonnaie')
        .select('*')
    return (
        { data, error }
    )
}

/**
 * get all category.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getAllCategory(supabase) {
    let { data, error } = await supabase
        .from('category')
        .select('*')
    return (
        { data, error }
    )
}

/**
 * get all infos contests
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getInfoContest(supabase) {
    let { data, error } = await supabase
        .from('contest')
        .select(`
        id, title, startDate, endDate, description,
        cryptoMonnaie (
          name
        ),
        category (
          name
        )
      `)
    return (
        { data, error }
    )
}

/**
 * Insert a Contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} updates 
 * @returns { data, error }
 */
export async function insertContest(supabase, updates) {
    let { data, error } = await supabase.from('contest').insert(updates)
    return (
        { data, error }
    )
}

/**
 * Insert a category.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} updates 
 * @returns { error }
 */
export async function insertCategory(supabase, updates) {
    let { error } = await supabase
        .from('contest_category')
        .insert(updates)
    return (
        { error }
    )
}

/**
 * Update a contest
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} updates 
 * @param {int} id
 * @returns { error }
 */
export async function updateContest(supabase, updates, id) {
    const { error } = await supabase.from('contest').update(updates).eq("id", id);
    return (
        { error }
    )
}

/**
 * delete a contest
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idContest 
 * @returns {  error }
 */
export async function deleteContest(supabase, idContest) {
    await supabase
        .from('contest_category')
        .delete()
        .eq('fk_contest', idContest)
    await supabase
        .from('profiles_contest')
        .delete()
        .eq('fk_contest', idContest)

    const { error } = await supabase
        .from('contest')
        .delete()
        .eq('id', idContest)
    return (
        { error }
    )
}

/**
 * delete a category
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idContest 

 */
export async function deleteCategory(supabase, idContest) {
    await supabase
        .from('contest_category')
        .delete()
        .eq('fk_contest', idContest)
}

/**
 * Update a category
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} updates 
 * @returns {  error }
 */
export async function updateCategory(supabase, updates) {
    const { error } = await supabase
        .from('contest_category')
        .insert(updates)
    return ({ error })
}








