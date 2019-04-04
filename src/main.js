import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'firebase/database'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false

  // Initialize Firebase
  const app = firebase.initializeApp({
    apiKey: process.env.FIREBASE.apiKey,
    authDomain: process.env.FIREBASE.authDomain,
    databaseURL: process.env.FIREBASE.databaseURL,
    projectId: process.env.FIREBASE.projectId,
    storageBucket: process.env.FIREBASE.storageBucket,
    messagingSenderId: process.env.FIREBASE.messagingSenderId
  });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
