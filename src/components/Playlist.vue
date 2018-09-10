<template>
    <div class="row">
        <div class="col-6 offset-3 playlist-view">
            <h5>Your Playlist: {{mySongs.length}} songs!</h5>
            <img src="https://lh3.ggpht.com/l3wjJ1leMIC24A5Begzi-Xe-hyB-1dPjFHEpUeJtLMHaWP_StxVuEvM1_vsN-DzTu1Y=s180" id="songArt" class="albumArt"
            />
            <audio controls id="previewer" class="song-item"></audio>
            <div v-for="(song, index) in mySongs">
                <button @click="deleteSong(song.id)" class="btn btn-danger song-delete">X</button>
                <button @click="loadSong(song)" class="btn playlist-song">"{{song.title}}" by {{song.artist}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Playlist',
        data() {
            return {
                newList: {}
            }
        },
        mounted() {
            this.$store.dispatch('getMySongs')
        },
        methods: {
            loadSong(song) {
                document.getElementById('songArt').src = song.art;
                document.getElementById('previewer').src = song.preview;
            },
            deleteSong(id) {
                this.$store.dispatch('deleteSong', id)
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            mySongs() {
                return this.$store.state.mySongs
            }
        },
        components: {}
    }
</script>

<style scoped>
    h5 {
        font-weight: 700;
        color: white;
    }

    .playlist-view {
        width: 300px;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        padding: 20px;
    }

    .playlist-view a {
        padding: 10px;
        text-decoration: none;
        font-size: 20px;
        color: #374a5e;
        display: block;
    }

    .playlist-song:active,
    .playlist-song:focus {
        background-color: lightgoldenrodyellow;
    }

    .playlist-view:hover {
        color: #43b683;
        cursor: pointer;
    }

    .playlist-song {
        width: 50%;
        border-radius: 10px;
        background-color: lightgray;
        margin: auto;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .playlist-song:not(.focus):hover,
    .playlist-song:not(.active):hover {
        background-color: lightgoldenrodyellow;
    }

    .albumArt {
        width: 150px;
        margin: auto;
        margin-bottom: 10px;
        display: block;

    }

    .song-delete {
        margin-top: -5px;
    }

    .song-up {
        transform: rotate(180deg);
        margin-top: -5px;
    }

    .song-down {
        margin-top: -5px;
    }
</style>