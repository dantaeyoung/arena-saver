<template>
  <div>
    <div v-if="data_loaded">
      <slot> </slot>
    </div>
  </div>
</template>

<style>
</style>

<script>
const Arena = require('are.na')
const arena = new Arena()

export default {
  data() {
    return {
      meta_channel_data: [],
      channels_slugs: [],
      data_loaded: false,
    }
  },
  async fetch() {
    await arena
      .channel(this.meta_channel)
      .get()
      .then((chan) => {
        this.meta_channel_data = chan
      })
      .catch((err) => {
      })

    // get slugs of channels

    this.channels_slugs = this.meta_channel_data.contents.map((c) => {
      return c['slug']
    })

    const promises = this.channels_slugs.map((slug) => {
      return arena
        .channel(slug)
        .get({
          page: 1,
          per: 100, //currently only gets 100 blocks
        })
        .then((d) => {
          return d
        })
    })

    // get channels datas

    await Promise.all(promises).then((data) => {
      const channels_datas = {}

      channels_datas[this.meta_channel] = this.meta_channel_data;

      Object.values(data).forEach((chdata) => {
        channels_datas[chdata['slug']] = chdata
      })

      const all_content_by_id = {}

      this.meta_channel_data.contents.forEach((mcblock) => {
        if(mcblock.base_class == 'Block') {
          all_content_by_id[mcblock.id] = mcblock;
          all_content_by_id[mcblock.id]['source_channel_slug'] = this.meta_channel;
        }
      });

      Object.values(channels_datas).forEach((ch) => {
        if ('contents' in ch) {
          ch.contents.forEach((d) => {
            try {
              const url = d.image.original.url
              all_content_by_id[d['id']] = d
              all_content_by_id[d['id']]['source_channel_slug'] = ch['slug']
            } catch {
              // not an image
            }
          })
        }
      })

      this.data_loaded = true
      this.$store.commit('set_all_content_by_id', all_content_by_id)
      this.$store.commit('set_channels_datas', channels_datas)
    })
  },
  methods: {
  },
  computed: {
    meta_channel() {
      return this.$store.state.meta_channel
    },
  },
  watch: {
    meta_channel() {
      this.$store.commit("resetState");
      this.$fetch()
    },
  },
  created() {},
}
</script>
