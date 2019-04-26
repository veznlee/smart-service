import {
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  routeHasExist,
  routeEqual,
  localSave,
  localRead
} from '@/libs/appUtil'

export default {
  state: {
    tagNavList: [],
    local: localRead('local')
  },
  mutations: {
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
    },
    addTag (state, router) {
      state.tagNavList.push(router);
      setTagNavListInLocalstorage([...state.tagNavList])
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    }
  }
}
