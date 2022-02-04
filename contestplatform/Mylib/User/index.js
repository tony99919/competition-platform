
/**
 * retrieves the user's username.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns  { data, error }  
 */
export async function getUsername(supabase, id) {
    return (
        await supabase
        .from('profiles')
        .select('username')
        .eq('id',id)
        .single()
    )
}

/**
 * retrieves the user's session.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns session 
 */
 export function getSession(supabase) {
    return (
        supabase.auth.session()
    )
}

/**
 * logout the user.
 * @param {SupabaseClient} supabase supabase client for CRUD
 */
export function logout(supabase) {
    supabase.auth.signOut()
}

/**
 * Get user connected.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @returns user or null
 */
export function getUserConnected(supabase) {
    return (
        supabase.auth.user()
    )
}

/**
 * Sign up user with email and password.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} email 
 * @param {string} password 
 * @returns error or null
 */
export async function signUp(supabase, email, password) {
    const { error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    return (
        { error }
    )
}

/**
 * Sign in user with email and password.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} email 
 * @param {string} password 
 * @returns error or null
 */
export async function signIn(supabase, email, password) {
    const { error } = await supabase.auth.signIn({
        email: email,
        password: password
    })
    return (
        { error }
    )
}
/**
 * Sign in user with provider.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} provider 
 * @returns error or null
 */
export async function signInWithProvider(supabase, provider) {
    const { error } = await supabase.auth.signIn({ provider });
    return (
        { error }
    )
}

/**
 * Sign in user with email for magiclink.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} email 
 * @returns error or null
 */
export async function signUpWithEmail(supabase, email) {
    const { error } = await supabase.auth.signIn(email)
    return (
        { error }
    )
}
/**
 * Get player profile
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function getPlayerProfile(supabase, idUser) {
    let { data, error } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', idUser)
    return (
        { data, error }
    )
}

/**
 * retrieves whether the user is admin or standard.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function isAdmin(supabase, idUser) {
    let { data, error } = await supabase
        .from('profiles')
        .select('isAdmin')
        .eq('id', idUser)
        .single()
    return (
        { data, error }
    )
}

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
 * Update current user.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {string} updates 
 * @returns { data, error }
 */export async function updateUser(supabase, updates) {
    let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
    })
    return (
        { error }
    )
}
/**
 * delete profile in contest.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function deleteProfileInContest(supabase, idUser) {
    let { data, error } = await supabase
        .from('profiles_contest')
        .delete()
        .eq('fk_profiles', idUser)
    return (
        { data, error }
    )
}

/**
 * delete current profile.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function deleteProfile(supabase, idUser) {
    let { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', idUser)
    return (
        { error }
    )
}

/**
 * delete current user.
 * @param {SupabaseClient} supabase supabase client for CRUD
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function deleteUser(supabase, idUser) {
    const supabaseAuth = process.env.NEXT_PUBLIC_SUPABASE
    let { error } = await supabase.auth.api.deleteUser(
        idUser,
        supabaseAuth)
    return (
        { error }
    )
}









