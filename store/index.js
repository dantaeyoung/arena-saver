const getDefaultState = () => {
  return {
    all_content_by_id: {},
    channels_datas: {},
    meta_channel: "",
    interval: 0,
  }
}

export const state = getDefaultState();

export const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState())
  },
  set_all_content_by_id(state, acbi) {
    state.all_content_by_id = acbi;
  },
  set_channels_datas(state, cds) {
    state.channels_datas = cds;
  },
  set_meta_channel(state, mc) {
    state.meta_channel = mc;
  },
  set_interval(state, interval) {
    state.interval = interval;
  },
}
