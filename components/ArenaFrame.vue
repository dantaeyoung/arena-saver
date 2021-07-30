<template>
  <div class="arenaframe">
    <div class="block" v-if="blockImageUrl != null">
      <div class="image"><img :src="blockImageUrl" /></div>
      <div class="caption">
        <div class="title">{{ block.title }}</div>
        <div class="description">{{ block.description }}</div>
        <div class="addedby" v-if="'user' in block">
          Added by <a target="_newtab" :href="'https://www.are.na/' + block.user.slug"><span class="user">{{ blockUserFullname }} </span></a>
        </div>
        <div class="from-channel" v-if="'user' in blockParentChannel">
          From the channel
          <a target="_newtab" :href="'https://www.are.na/' + blockParentChannel.user.slug + '/'+ blockParentChannel.slug"><span class="channel-title">{{ blockParentChannel.title }}</span></a> by
          <a target="_newtab" :href="'https://www.are.na/' + blockParentChannel.user.slug"><span class="user"> {{ blockParentChannel.user.full_name }}</span></a>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <Loader />
    </div>
  </div>
</template>

<style scoped>

.arenaframe {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: black;
}

.block {
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  object-fit:contain;
}

a {
  color: #777;
  text-decoration: none;
}

.image {
  width: 100%;
  height: calc(100% - 40px);
}

.caption {
  height: 20px;
  margin-top: 20px;
  font-size: 0.8em;
  color: #777;
  font-family: 'Inconsolata', monospace;
}

.title, .description {
  display: none;
}

.channel-title {
  font-style: italic; 
  color: #999;
}

.user {
  font-style: italic; 
  color: #999;
}

</style>

<script>

export default {

  data() {
    return {
      polling: null,
      block: null,
      blockId: null,
      timeout: null,
    }
  },
  methods: {
    changeBlock: function () {
      this.blockId = Object.keys(this.all_content_by_id)[
        Math.floor(Math.random() * Object.keys(this.all_content_by_id).length)
      ]
      console.log('changing images to !' + this.blockId)
      this.block = this.all_content_by_id[this.blockId]

      if(this.blockImageUrl == null) { 
        console.log("uh oh, this block might not have an image. let's change again");
//        this.changeBlock();
      }

      this.timeout = setTimeout(this.changeBlock, this.interval);
    },
  },
  computed: {
    all_content_by_id: function () {
      return this.$store.state.all_content_by_id
    },
    channels_datas: function () {
      return this.$store.state.channels_datas
    },
    interval: function () {
      return this.$store.state.interval
    },
    blockParentChannel: function () {
      return this.channels_datas[this.block['source_channel_slug']]
    },
    blockImageUrl: function () {
      try {
        return this.block.image.original.url
      } catch {
        try {
          return this.block.image.large.url
        } catch {
          return null
        }
      }
    },
    blockUserFullname() {
      try {
        return this.block.user.full_name;
      } catch {
        return null;
      }
    },
  },
  created() {
  },
  mounted() {
    this.changeBlock()
//    this.polling = setInterval(() => {
//      this.changeBlock()
//    }, this.interval)
  },
  beforeDestroy() {
//    clearInterval(this.polling)
  },
}
</script>
