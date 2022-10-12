<template>

  <div id="app" class="app">
    <div class="header">
      <h1>Banco Misión TIC</h1>
      <nav v-if="is_auth">
        <button @click="loadHome">Inicio</button>
        <button @click='loadAccount'>Cuenta</button>
        <button @click='logout'>Cerrar sesión</button>
      </nav>
      <nav v-else>
        <button @click="loadLogin">Iniciar sesión</button>
        <button @click="loadSignUp">Registrarse</button>
      </nav>

    </div>

    <div class="main-component">
           <router-view
                @completedLogin="completedLogin"
                
                
            > 
            </router-view><!--evento que viene de Login y account-->
            
        </div>

    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>

<script>
//Options API
export default {
  name: 'App',
  data: function(){
    return{
      is_auth: false,
    }
  },
  methods: {
    veridyAuth:function(){
      this.is_auth=localStorage.getItem('isAuth')||false;
      if(this.is_auth)
        this.$router.push({name:'home'})
      else
        this.$router.push({name:'login'})

    },
    loadLogin: function(){
      this.$router.push({name:"login"})
      console.log('loadLogin activado')
    },
    loadSignUp: function(){
      this.$router.push({name:"signup"})
    },
    loadHome: function(){
      this.$router.push({name:'home'})
    },
    loadAccount: function(){
      this.$router.push({name:"account"})
    },
    logout: function() {
      localStorage.clear()
      alert('sesión Cerrada');
      this.veridyAuth();
    },
    completedLogin: function(data){
      localStorage.setItem('isAuth',true);
      localStorage.setItem('username',data.username);
      localStorage.setItem('token_access',data.token_access);
      localStorage.setItem('token_refresh',data.token_refresh);
      alert('Autenticación Exitosa')
      this.veridyAuth()
    }

  },
  created: function(){

  }

}
</script>
<style>
   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
  
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
   body {
    font-family: 'Roboto', 'sans-serif';
  }

  .header {
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #283747;
    color: #E5E7E9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1 {
    width:30%;
    text-align: center;
  }

  .header nav{
    height: 100%;
    width: 30%;
    font-size: 20px;

    display: flex;
    justify-content: space-around;
    align-items: center;

  }
  .header nav button{
    color:#E5E7E9;
    background-color:#283747;
    border: 1px solid #E5E7E9;
    border-radius: 15px;
    padding: 10px 25px;
    white-space: 10;
    margin: 2px;
  }

  .header nav button:hover {
    color: #768da6;
    background-color: #E5E7E9;
  }

  .main-component{
    height: 75vh;
    margin: 0;
    padding: 0;
  }

  .footer{
    width: 100%;
    height: 10vh;
    min-height: 80px;
    background-color: #283747;
    color: #E5E7E9;
  }

  .footer h2{
    width: 100px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
