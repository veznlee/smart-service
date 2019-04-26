export default {
    //sessionStorage
    setSession: function(key, value) {
        window.sessionStorage[key] = value;
    },
    getSession: function(key) {
        return window.sessionStorage[key] || false;
    },
    setSessionObj: function(key, value) {
        window.sessionStorage[key] = JSON.stringify(value);
    },
    getSessionObj: function(key) {
        return window.sessionStorage[key]?JSON.parse(window.sessionStorage[key]):false;
    },
    removeSession: function(key) {
        window.sessionStorage.removeItem(key);
    },
    //localStorage
    setLocal: function(key, value) {
        window.localStorage[key] = value;
    },
    getLocal: function(key) {
        return window.localStorage[key] || false;
    },
    setLocalObj: function(key, value) {
        window.localStorage[key] = JSON.stringify(value);
    },
    getLocalObj: function(key) {
        return window.localStorage[key]?JSON.parse(window.localStorage[key]):false;
    },
    removeLocal: function(key) {
        window.localStorage.removeItem(key);
    }
}