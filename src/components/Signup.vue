<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">

    <button @click="signUp">登録</button>

    <p>既にアカウントをお持ちの方はおこちら
      <router-link to="/signin">sign in</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
      .then(user => {
        alert('アカウントを登録しました: ', user.email)
        this.$router.push('/')
      })
      .catch(error => {
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

.signup {
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
