<template>
  <div class="config">
    <slot></slot>
  </div>
</template>

<style scoped>

.config {
}
</style>

<script>

var default_meta_channel = "channels-for-ambient-screens"
var default_interval = 100000;

export default {
  data() {
    return {
      meta_channel: null,
      interval: null,
    }
  },
  created() {

    this.meta_channel = this.getQueryOrDefault('meta-channel', default_meta_channel)

    this.interval = this.getQueryOrDefault('interval', default_interval)

    this.$store.commit("set_meta_channel", this.meta_channel)
    this.$store.commit("set_interval", this.interval)
  },
  methods: {
    getQueryOrDefault(querytag, def) {
      if (querytag in this.$route.query) {
        return this.$route.query[querytag]
      } else {
        return def
      }
    },
  },
}
</script>

