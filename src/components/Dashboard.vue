<template>
  <div>
    <br />
    <div class="btn-group">
      <button class="btn btn-pair" @click="togglePlaylist">Playlist View</button>
      <button class="btn btn-pair" @click="toggleSearch">Search View</button>
    </div>
    <br /><br />
    <Search v-show="showSearch"></Search>
    <Playlist v-show="showPlaylist"></Playlist>
    <br /><br />
  </div>
  </div>
</template>

<script>
  import Search from './Search'
  import Playlist from './Playlist'
  export default {
    name: 'Dashboard',
    data() {
      return {
        showSearch: true,
        showPlaylist: false
      }
    },
    mounted() {
      this.$store.dispatch("getMySongs");
    },
    computed: { //if I want to access something on the state, I need to reference it in computed.
    },
    methods: {
      togglePlaylist() {
        this.showPlaylist = true
        this.showSearch = false
      },
      toggleSearch() {
        this.showPlaylist = false
        this.showSearch = true
      }
    },
    components: { Search, Playlist }
  }
</script>

<style scoped>
  .btn-pair {
    background-color: #374a5e;
    color: white;
  }
</style>