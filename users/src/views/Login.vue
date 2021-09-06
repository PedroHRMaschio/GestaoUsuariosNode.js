<template>
  <div>
    <h2>Login de usuário!</h2>
    <hr>

    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
        <div class="notification is-danger">
          <p>{{error}}</p>
        </div>
        </div>
        <label for="inputemail">E-mail</label>
        <input type="email" placeholder="Digite aqui o seu e-mail :p" class="input" name="inputemail" id="inputemail" v-model="email">
        <label for="inputpassword">Senha</label>
        <input type="password" placeholder="Agora precisamos que você crie uma senha xD" class="input" name="inputpassword" id="inputpassword" v-model="password">
        <button class="button is-success cadastrar" @click="login">Entrar</button>
      </div>
    </div>
      
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      password: "",
      email: "",
      error: undefined
    }
  },
  methods: {
    login(){
      axios.post("http://192.168.0.105:8686/login",{
        password: this.password,
        email: this.email,
      }).then(res => {
          console.log(res)
          localStorage.setItem("token",res.data.token)
      }).catch(err => {
        console.log(err)
        var msgErro = err.response.data.err;
        this.error = msgErro
      })
  }
  }
}

</script>


<style scoped>
.cadastrar{
  margin-top: 2%
}
</style>