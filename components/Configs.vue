<template>
  <div class="config" @mousemove="mousemove">
    <div :class="{ show: showOverlay }" id="configoverlay">
      interval: <input type="text"  v-model="interval_input">
      meta_channel: <input type="text" v-model="meta_channel_input">
      <button @click="reloadSite">reload site with these configs</button>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>

* {
  font-family: 'Inconsolata', monospace;
}
#configoverlay {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #894F97;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
  padding: 20px;
}

.show {
  visibility: visible !important;
  opacity: 1 !important;
}

input {
  width: calc(100% - 12px);
  padding: 5px;
  border: 1px solid black;
}

button {
  margin-top: 10px;
  text-align: right;
}
</style>

<script>

var default_meta_channel = "channels-for-ambient-screens"
var default_interval = 10000;

export default {
  data() {
    return {
      timeout: null,
      showOverlay: false,
      meta_channel_input: null,
      interval_input: null,
    }
  },
  created() {
    var mc = this.getQueryOrDefault('meta_channel', default_meta_channel)
    this.meta_channel_input = mc;

    var intv = this.getQueryOrDefault('interval', default_interval)
    this.interval_input = intv;

    this.$store.commit("set_meta_channel", mc);
    this.$store.commit("set_interval", intv)
  },
  methods: {
    reloadSite() {
      var params = {
        meta_channel: this.meta_channel_input,
        interval: this.interval_input,
      };
      var newpath = this.$route.path + "?" ;
      newpath += "interval=" + this.interval_input + "&";
      newpath += "meta_channel=" + this.meta_channel_input + "&";
      console.log(newpath);
      this.$store.commit("set_meta_channel", this.meta_channel_input)
      this.$store.commit("set_interval", this.interval_input)
      this.$router.push({path: this.$route.path, query : params }); // NOT WOKRING
//      location.reload();
      
//      this.$router.go();
    },
    getQueryOrDefault(querytag, def) {
      if (querytag in this.$route.query) {
        return this.$route.query[querytag]
      } else {
        return def
      }
    },
    mousemove() {
      var self = this;
      self.showOverlay = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        self.showOverlay = false;
      }, 3000);
    },
  },
  computed: {
    interval() {
      return this.$store.state.interval;
    },
    meta_channel() {
      return this.$store.state.meta_channel;
    },
  },
}
</script>

