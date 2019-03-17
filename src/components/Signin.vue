<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">

    <button @click="signIn">ログイン</button>

    <p>アカウントをお持ちでない方はこちら
      <router-link to="/signup">sign up</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then(user => {
        alert('sign inに成功しました')
        this.$router.push('/')
      },
      error => {
        alert(error.message)
      })
    }
  }
}

</script>

<style scope>
h1, h2 {
  font-weight: nomal;
}

.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

input {
  margin: 10px 0;
  padding: 10px;
}

button {
  margin: 10px 0;
  padding: 10px;
}
</style>
