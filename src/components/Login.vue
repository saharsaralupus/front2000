<template>
    <div class="login_user">
        <div class="container_login_user">
            <h2>Iniciar Sesión</h2>
            <form @submit.prevent="processLoginUser">
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "../utils/axios"
export default {
    name: "Login",
    data: function() {
        return {
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        processLoginUser: function(){
            axios.post("login/", this.user, {headers: {}})
            .then( (res) => {
                let dataLogin = {
                    username: this.user.username,
                    token_access: res.data.access,
                    token_refresh: res.data.refresh,
                }
                this.$emit('completedLogin', dataLogin)
            })
            .catch((error) =>{
              if (error.response.status == "401")
                  alert("ERROR 401: Credenciales Incorrectas")
            })
        }
    }
}
</script>

<style>
.login_user {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container_login_user {
    border: 3px solid #283747;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login_user h2 {
    color:#283747;
}
.login_user form {
    width: 70%;
}
.login_user input {
    height: 40px;
    width: 100%;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #283747;
}
.login_user button {
    width: 100%;
    height: 40px;
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
}
.login_user button:hover{
    color: #E5E7E9;
    background: crimson;
    border: 1px solid #283747;
}
</style>

<!-- 
<template>
    <div class="login">
        <div class="container_login_user">
            <h2 class="title">Iniciar sesión</h2>
            <form @submit.prevent="">
                <input type="text" placeholder="Username">
                <br>
                <input type="text" placeholder="Password">
                <br>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    </div>
</template>

<style>


 .login_user{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contauner_login_user{
    border: 3px solid #283747;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login_user h2{
    color: #283747;
}

.login_user form{
    width: 70%;
}

.login_user input{
    height: 40px;
    width: 100%;

    padding: 10px 20px;
    margin: 5px 0;
}

</style> 
-->