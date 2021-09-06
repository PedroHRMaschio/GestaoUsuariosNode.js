<template>
  <div>
    <h2>Registro de usuário!</h2>
    <hr>

    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <form action="POST">
          <label for="inputname">Nome</label>
          <input type="text" placeholder="Digite aqui o seu nome :)" class="input" name="inputname" id="inputname" v-model="name">
          <label for="inputemail">E-mail</label>
          <input type="email" placeholder="Digite aqui o seu e-mail :p" class="input" name="inputemail" id="inputemail" v-model="email">
          <label for="inputpassword">Senha</label>
          <input type="password" placeholder="Agora precisamos que você crie uma senha xD" class="input" name="inputpassword" id="inputpassword" v-model="password">
          <label for="confirmpassword">Confirmação de senha</label>
          <input type="password" placeholder="Confirme aqui a sua senha ;)" class="input" name="confirmpassword" id="confirmpassword">
          <button class="button is-success cadastrar" @click="register">Cadastrar</button>
        </form>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "",
      password: "",
      email: ""
    }
  },
  methods: {
    register(){
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
  }
  }
  
}

</script>


<style scoped>
.cadastrar{
  margin-top: 2%
}
</style>