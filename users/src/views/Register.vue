<template>
  <div>
    <h2>Registro de usuário!</h2>
    <hr>

    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
        <div class="notification is-danger">
          <p>{{error}}</p>
        </div>
        </div>

        <label for="inputname">Nome</label>
        <input type="text" placeholder="Digite aqui o seu nome :)" class="input" name="inputname" id="inputname" v-model="name">
        <label for="inputemail">E-mail</label>
        <input type="email" placeholder="Digite aqui o seu e-mail :p" class="input" name="inputemail" id="inputemail" v-model="email">
        <label for="inputpassword">Senha</label>
        <input type="password" placeholder="Agora precisamos que você crie uma senha xD" class="input" name="inputpassword" id="inputpassword" v-model="password">
        <label for="confirmpassword">Confirmação de senha</label>
        <input type="password" placeholder="Confirme aqui a sua senha ;)" class="input" name="confirmpassword" id="confirmpassword">
        <button class="button is-success cadastrar" @click="register">Cadastrar</button>
      </div>
    </div>
      
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      name: "",
      password: "",
      email: "",
      error: undefined
    }
  },
  methods: {
    register(){
      axios.post("http://192.168.0.105:8686/user",{
        name: this.name,
        password: this.password,
        email: this.email,
      }).then(res => {
        this.$router.push({
          name: "Home"
        })
        console.log(res)
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