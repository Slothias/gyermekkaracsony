

const mutations= {
    set(state, [key,value]){
        state[key] = value
    },
    setUsername(state, username){
        state.user.name = username;
    },
    setAdmin(state, admin){
        state.user.admin = admin
    },
    setLoggedIn(state, loggedIn){
        state.user.loggedIn = loggedIn;
    },
}

export default mutations;