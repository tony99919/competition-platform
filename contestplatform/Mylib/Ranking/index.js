/**
 * get data ranking general.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns { data, error }
 */
export async function getDataRanking(supabase) {
    let { data, error } = await supabase
    .from('profiles')
    .select('*')
    return (
        { data, error }
    )
}
