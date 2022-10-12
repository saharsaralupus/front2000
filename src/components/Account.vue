<template>
    <div v.if="loaded" class="informacion">
        <h1>Información de su cuenta</h1>
        <h2>
            Nombre: <span>{{name}}</span>
        </h2>
        <h2>
            Saldo: <span>{{balance}}</span>
        </h2>
        <h2
        >Correo Electrónico: <span>{{email}}</span>
    </h2>

    </div>
</template>

<script>
import axios from '../utils/axios'
import jwr_decode from "jwt-decode"
export default {
    name:"Account",
    data: function(){
        return{
            name: "",
            email: "",
            balance: 0,
            loaded: false
        }
    },

    methods: {
        getData: async function(){
            if(localStorage.getItem("token_access") ===null || localStorage.getItem("token") ===null){
                this.$emit('logout')
            }

            await this.verifyToken();

            let token = localStorage.getItem('token_access')
            let userId = jwt_decode(token).user_id.toString();

            axios.get('user/'+userId, {headers: {"Authorization": "Bearer "+token}})
                    .then(result => {
                        this.name = result.data.name;
                        this.email = result.data.email;
                        this.balance = result.data.account.balance;
                        this.loaded = true;
                    })
                    .catch ((err)=> {
                        console.log(err)
                        this.$emit('logout')
                    })

        },
        verifyToken: function(){
            let refresh = localStorage.getItem("token_refresh")
            return axios.post('refresh/', {refresh})
                        .then(result => {
                                localStorage.setItem("token_access", result.data.access)
                        })
                        .catch(()=> {
                            this.$emit('logout')
                        })
        }
    },

    created: function(){
        this.getData();
    }

}
</script>

<style>
    .information{
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
    }
    .information h1{
        font-size: 60px;
        color: #0f1316;
    }
    .information h2{
        font-size: 40px;
        color: #283747;
    }
    .information span{
        color: cadetblue;
        font-weight: bold;
    }
</style>