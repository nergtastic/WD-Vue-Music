import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../utils/firebaseInit'
import axios from 'axios'

vue.use(vuex)

let itunes = axios.create({
    baseURL: 'https://itunes.apple.com/search?term=',
    timeout: 5000
})

let store = new vuex.Store({
    state: { //This sets up a watcher for each entry here
        user: {},
        songs: [],
        mySongs: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setSongs(state, songs) {
            state.songs = songs
        },
        setMySongs(state, songs) {
            state.mySongs = songs
        }
    },
    actions: {
        search({ commit, dispatch }, query) {
            itunes.get('' + query).then(res => {
                console.log("Itunes: ", res.data.results)
                commit("setSongs", res.data.results)
            })
                .catch(err => { console.error(err) })
        },
        // USER AUTHENTICATION
        register({ commit, dispatch }, user) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    router.push("/dashboard")
                    commit("setUser", res.user)
                    firebase.auth().currentUser.updateProfile({ displayName: user.displayName })
                        .then(res => {
                            console.log("Profile Updated")
                        })
                        .catch(err => { console.error(err) })
                    firebase.auth().currentUser.sendEmailVerification()
                        .then(res => {
                            console.log("Verification Email Sent")
                        })
                        .catch(err => { console.error(err) })
                })
                .catch(err => { console.error(err) })
        },
        login({ commit, dispatch }, user) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    router.push('/dashboard')
                    commit("setUser", res.user)
                })
                .catch(err => { console.error(err) })
        },
        logout({ commit, dispatch }) {
            firebase.auth().signOut()
                .then(res => {
                    router.push('/login')
                    commit('setUser', {})
                })
                .catch(err => { console.error(err) })
        },
        authenticate({ commit, dispatch }) {
            // you can change the default route here
            //if someone is signed in, it goes to dashboard, if not, go to auth
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('setUser', user)
                    dispatch('getMySongs')
                    router.push('/dashboard')
                } else {
                    router.push('/login')
                }
            });
        },
        getMySongs({ state, commit, dispatch }) {
            db.collection('songs').where("creatorId", "==", state.user.uid).get().then(querySnapShot => {
                let songs = []
                querySnapShot.forEach(doc => {
                    if (doc.exists) {
                        let song = doc.data()
                        song.id = doc.id
                        songs.push(song)
                    }
                })
                commit('setMySongs', songs)
            })
        },
        addSong({ commit, dispatch }, newSong) {
            db.collection('songs').add(newSong).then(doc => {
                console.log("Added Song with ID: ", doc.id)
                dispatch('getMySongs')
            })
        },
        deleteSong({ commit, dispatch }, id) {
            db.collection('songs').doc(id).delete().then(() => {
                dispatch('getMySongs')
            })
        }
    }
})

export default store