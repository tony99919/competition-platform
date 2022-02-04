import { supabase } from '../utils/supabaseClient'
const playerContest = require('./PlayerContest')
const user = require('./User')
const contest = require('./Contest')
const ranking = require('./Ranking')

/**
 * retrieves the user's session.
 * @returns session 
 */
export function getSession() {
    return (
        user.getSession(supabase)
    )
}

/**
 * retrieves the user's usernane.
 * @param {int} id 
 * @returns { data, error } 
 */
export async function getUsername(id) {
    return (
        user.getUsername(supabase, id)
    )
}



/**
 * logout the user.
 */
export function logout() {
    user.logout(supabase)
}

/**
 * Sign up user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns error or null
 */
export function signUp(email, password) {
    return (
        user.signUp(supabase, email, password)
    )
}

/**
 * Sign in user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns error or null
 */
export function signIn(email, password) {
    return (
        user.signIn(supabase, email, password)
    )
}

/**
 * Sign in user with provider.
 * @param {string} provider 
 * @returns error or null
 */
export function signInWithProvider(provider) {
    return (
        user.signInWithProvider(supabase, provider)
    )
}
/**
 * Sign in user with email for magiclink.
 * @param {string} email 
 * @returns error or null
 */
export function signUpWithEmail(email) {
    return (
        user.signUpWithEmail(email)
    )
}

/**
 * Get user connected.
 * @returns user or null
 */
export function getUserConnected() {
    return (
        user.getUserConnected(supabase)
    )
}


/**
 * Get player profile
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function getPlayerProfile(idUser) {
    return (
        user.getPlayerProfile(supabase, idUser)
    )
}

/**
 * retrieves whether the user is admin or standard.
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function isAdmin(idUser) {
    return (
        user.isAdmin(supabase, idUser)
    )
}

/**
 * Update current user.
 * @param {string} updates 
 * @returns { data, error }
 */
export async function updateUser(updates) {
    return (
        user.updateUser(supabase, updates)
    )
}

/**
 * delete current profile.
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function deleteProfile(idUser) {
    return (
        user.deleteProfile(idUser)
    )
}

/**
 * delete profile in contest.
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function deleteProfileInContest(idUser) {
    return (
        user.deleteProfileInContest(idUser)
    )
}

/**
 * delete current user.
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function deleteUser(idUser) {
    return (
        user.deleteUser(supabase, idUser)
    )
}

/**
 * get data ranking general.
 * @returns { data, error }
 */
export async function getDataRanking() {
    return (
        ranking.getDataRanking(supabase)
    )
}

//contest

/**
 * get number of player for one contest.
 * @param {int} idContest 
 * @returns { count }
 */
export async function getNbPlayer(idContest) {
    return (
        contest.getNbPlayer(supabase, idContest)
    )
}

/**
 * get all of player for one contest.
 * @returns {  error }
 */
export async function getPlayer(idContest) {
    return (
        contest.getPlayer(supabase, idContest)
    )
}

/**
 * get all infos for one contest.
 * @returns {  error }
 */
export async function getConstest(idContest) {
    return (
        contest.getConstest(supabase, idContest)
    )
}

/**
 * get all id contest.
 * @returns {  error }
 */
export async function getIdContest() {
    return (
        contest.getIdContest(supabase)
    )
}


/**
 * get all infos contests
 * @returns { data, error }
 */
export async function getInfoContest() {
    return (
        contest.getInfoContest(supabase)
    )
}

/**
 * get all crypto.
 * @returns { data, error }
 */
export async function getAllCrypto() {
    return (
        contest.getAllCrypto(supabase)
    )
}

/**
 * get all category.
 * @returns { data, error }
 */
export async function getAllCategory() {
    return (
        contest.getAllCategory(supabase)
    )
}

/**
 * Insert a Contest.
 * @param {string} updates 
 * @returns { data, error }
 */
export async function insertContest(updates) {
    return (
        contest.insertContest(supabase, updates)
    )
}

/**
 * Insert a category.
 * @param {string} updates 
 * @returns { error }
 */
export async function insertCategory(updates) {
    return (
        contest.insertCategory(supabase, updates)
    )
}

/**
 * Update a contest
 * @param {string} updates 
 * @param {int} id
 * @returns { error }
 */
export async function updateContest(updates, id) {
    return (
        contest.updateContest(supabase, updates, id)
    )
}

/**
 * Update a category
 * @param {string} updates 
 * @returns {  error }
 */
export async function updateCategory(updates) {
    return (contest.updateCategory(supabase, updates))
}

/**
 * delete a category
 * @param {int} idContest
 */
export async function deleteCategory(idContest) {
    contest.deleteCategory(supabase, idContest)
}

/**
 * delete a contest
 * @param {int} idContest 
 * @returns { error }
 */
export async function deleteContest(idContest) {
    return (
        contest.deleteContest(supabase, idContest)
    )
}

//playerContest

/**
 * retrive's player info for a contest
 * @param {int} idContest 
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function getPlayerInfoContest(idContest, idUser) {
    return (
        playerContest.getPlayerInfoContest(supabase, idContest, idUser)
    )
}

/**
 * retrive's all profile contest info for a user
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function getProfileContestByUserID(idUser) {
    return (
        playerContest.getProfileContestByUserID(supabase, idUser)
    )
}

/**
 * insert a player in a contest.
 * @param {int} idContest 
 * @param {int} idUser 
 * @returns { data, error }
 */
export async function insertPlayerInContest(idContest, idUser) {
    return (
        playerContest.insertPlayerInContest(supabase, idContest, idUser)
    )
}

/**
 * update a player information in a contest.
 * @param {string} updates 
 * @param {int} id_pro_con 
 * @returns { data, error }
 */
export async function updateContestForUser(updates, id_pro_con) {
    return (
        playerContest.updateContestForUser(supabase, updates, id_pro_con)
    )
}
