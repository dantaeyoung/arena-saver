<template>
  <div class="arenaframe">
    <div class="block" v-if="blockImageUrl != null">
      <div class="image"><img :src="block.image.original.url" /></div>
      <div class="title">{{ block.title }}</div>
      <div class="description">{{ block.description }}</div>
      <div class="description_html">{{ block.description_html }}</div>
      <div class="addedby">
        Added by <span class="user"> {{ block.user.full_name }} </span>
      </div>
      <div class="from-channel">
        From the channel
        <span class="channel-title">{{ blockParentChannel.title }}</span> by
        <span class="user"> {{ blockParentChannel.user.full_name }}</span>
      </div>
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
  background-color: black;
  color: #aaa;
}

img {
  width: 100%;
  height: auto;
}

.image {
  max-width: 500px;
}

.title {
  display: none;
}
</style>

<script>
export default {
  data() {
    return {
      polling: null,
      imageInterval: 100000,
      block: null,
      blockId: null,
    }
  },
  methods: {
    changeBlock: function () {
      this.blockId = Object.keys(this.all_content_by_id)[
        Math.floor(Math.random() * Object.keys(this.all_content_by_id).length)
      ]

      console.log('changing images to !' + this.blockId)
      this.block = this.all_content_by_id[this.blockId]
    },
  },
  computed: {
    all_content_by_id: function () {
      return this.$store.state.all_content_by_id
    },
    channels_datas: function () {
      return this.$store.state.channels_datas
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
  },
  created() {},
  mounted() {
    this.changeBlock()
    this.polling = setInterval(() => {
      this.changeBlock()
    }, this.imageInterval)
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
}
</script>
