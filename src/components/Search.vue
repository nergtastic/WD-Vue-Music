<template>
    <div class="dashboard row justify-content-around">
        <div class="col-10">
            <div class="col-12">
                <h1 class="col-12 title">Music</h1>
            </div>

            <div class="col-4 offset-4">
                <form @submit.prevent="search(query); query = '';">
                    <div class="form-group">
                        <label for="name">Search</label>
                        <input class="form-control" type="text" id="query" v-model="query">
                    </div>
                    <button class="btn btn-dark margin-bottom" type="submit">Search</button>
                </form>
            </div>
            <div class="col-12">
                <div class="container-fluid">
                    <div class="row justify-content-between">
                        <div class="col-4" v-for="song in songs">
                            <div class="card text-white bg-dark" style="max-width: 40rem;">
                                <div class="card-body ">
                                    <img :src="song.artworkUrl100" class="song-image" />
                                    <h3 class="card-title">{{song.artistName}}</h3>
                                    <h6 class="card-subtitle">"{{song.trackName}}"</h6>
                                    <h6 class="card-subtitle">{{song.collectionName}}</h6>
                                    <audio controls class="song-item">
                                        <source :src="song.previewUrl">
                                    </audio>
                                    <button @click="addSong(song)" type="button" class="btn btn-info">Add to Playlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                query: ''
            }
        },
        mounted() {
            this.$store.dispatch("getMySongs");
        },
        computed: { //if I want to access something on the state, I need to reference it in computed.
            songs() {
                return this.$store.state.songs
            },
            mySongs() {
                return this.$store.state.mySongs
            },
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            search(query) {
                this.$store.dispatch('search', query)
            },
            addSong(song) {
                let newSong = {
                    creatorId: this.user.uid,
                    title: song.trackName,
                    artist: song.artistName,
                    art: song.artworkUrl100,
                    preview: song.previewUrl,
                    id: song.trackId,
                    position: this.mySongs.length + 1
                }
                this.$store.dispatch('addSong', newSong)
                alert(newSong.title + ' successfully added to your playlist!')
            },
            togglePlaylist() {
                this.showPlaylist = true
                this.showSearch = false
            },
            toggleSearch() {
                this.showPlaylist = false
                this.showSearch = true
            }
        },
        components: {}
    }
</script>

<style scoped>
    .margin-bottom {
        margin-bottom: 2rem;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .title {
        font-size: 4rem
    }

    .card {
        height: auto;
        margin: 15px;
        border-radius: 25px;
    }

    h6 {
        margin: 5px 0px;
    }

    img {
        width: 100px;
    }

    .btn-info {
        margin-top: 25px;
    }

    .song-image {
        float: left;
        margin: 5px 25px 25px 25px;
    }
</style>