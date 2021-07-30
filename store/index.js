export const state = () => ({
  all_content_by_id: {},
  channels_datas: {},
})

export const mutations = {
  set_all_content_by_id(state, acbi) {
    state.all_content_by_id = acbi;
  },
  set_channels_datas(state, cds) {
    state.channels_datas = cds;
  },
  increment(state) {
    state.counter++
  }
}
