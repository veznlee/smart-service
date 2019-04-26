const user = {
  state: {
    user:{},
    permission:{},
    token:''
  },

  mutations: {
    addUser (state, user) {
      state.user = user
    },
    addPermission (state, permission) {
      state.permission = permission
    },
    addToken (state, token) {
      state.token = token
    }
  },
  
  actions: {
    setUser (context,payload) {
      context.commit('addUser', payload)
    },
    setPermission (context,payload) {
      context.commit('addPermission', payload)
    },
    setToken (context,payload) {
      context.commit('addToken', payload)
    },
  },

  getters: {
    getUser (state) {
      return state.user
    },
    getPermission (state) {
      return state.user
    },
    getToken (state) {
      return state.token
    }
  }
}

export default user