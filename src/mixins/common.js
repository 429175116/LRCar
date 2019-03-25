import wepy from 'wepy'
import {getStore} from 'wepy-redux'
import setting from '../model/setting'
// import endPoints from '../model/uri'
import Api from '../model/api'

export default class CommonMixin extends wepy.mixin {
  data = {
    state: null,
    store: null,
    api: null,
    setting: setting
  }

  onLoad() {
    this.store = getStore()
    this.state = getStore().getState()
    this.api = Api

    this.store.subscribe(() => {
      this.state = this.store.getState()
      this.$apply()
    })
    // new Api(setting.host, endPoints)
  }
}
