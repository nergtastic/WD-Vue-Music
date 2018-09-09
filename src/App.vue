<template>
  <div id="app">
    <div>
      <!-- <h4>Your Playlist:</h4>
      <div v-for="song in mySongs">
        <a>"{{song.title}}" by {{song.artist}}</a>
      </div> -->
      <!-- <form @submit.prevent="createList(); newList = {}">
        <button type="submit" class="btn btn-primary">Create Playlist</button>
      </form> -->
    </div>
    <div>
      <div>
        <button class="btn btn-outline-dark" @click="logout" v-if="user.email">Logout</button><br />
        <img class="logo" src="./assets/logo.svg">

      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        newList: {}
      };
    },
    mounted() {

    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      },
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      mySongs() {
        return this.$store.state.mySongs
      },
    }
  }
</script>

<style>
  body {
    background-color: gray
  }

  .logo {
    height: 200px;
    /* margin-left: 15%; */
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  /* .playlist-view {
    position: fixed;
    width: 300px;
    height: 100%;
    top: 0;
    left: 0;
    overflow: auto;
    padding: 200px 20px 20px 20px;
    background-color: rgba(0, 0, 0, .11);

  } */

  /* .playlist-view a {
    padding: 10px;
    text-decoration: none;
    font-size: 20px;
    color: blue;
    display: block;
  }

  .playlist-view a:hover {
    color: gray;
  } */
</style>