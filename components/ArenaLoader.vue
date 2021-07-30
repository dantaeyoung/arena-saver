<template>
  <div>
    <div :v-if="data_loaded">
      <slot>
      </slot>
    </div>
  </div>
</template>

<style>
.nuxt-logo {
  height: 180px;
}
</style>

<script>

const Arena = require("are.na");
const arena = new Arena();

var api_url_channels = 'https://api.are.na/v2/channels/'

export default {
  data() {
    return {
      channels: [],
      channels_slugs: [],
      data_loaded: false,
    }
  },
  async fetch() {

    await arena
      .channel(this.meta_channel)
      .get()
      .then(chan => {
        this.channels = chan.contents
      })
      .catch(err => {
        console.log(err)
      });
    

    // get slugs of channels

    this.channels_slugs = this.channels.map(c => {
      return c['slug'];
    });

    var promises = this.channels_slugs.map(slug => {
      return arena.channel(slug)
        .get({ 
            page: 1, 
            per: 100, //currently only gets 100 blocks
          })
        .then(d => {
//          console.log(d);
          return d;
      })
    })

    // get channels datas

    await Promise.all(promises)
      .then(data => {

        var channels_datas = {};
        Object.values(data).forEach(chdata => {
          channels_datas[chdata['slug']] = chdata;
        });


        var all_content_by_id = {};

        Object.values(channels_datas).forEach(ch => {
          ch.contents.forEach(d => {
            all_content_by_id[d['id']] = d;
            all_content_by_id[d['id']]['source_channel_slug'] = ch['slug']
          });
        });

//        console.log(Object.keys(all_content_by_id));

        this.data_loaded = true;
        this.$store.commit("set_all_content_by_id", all_content_by_id);
        this.$store.commit("set_channels_datas", channels_datas);

      })
  },
  methods: {
    changeBlock: function() {
      var contentId = this.all_content_by_id[Math.floor(Math.random() * this.all_content_by_id.length)];
      console.log("changing images to !" + contentId);
    },
  },
  computed: {
    meta_channel() {
      return this.$store.state.meta_channel;
    },
  },
  created() {
  },
}
</script>
