<template>
    <div class="container mt-3">
        <div class="col-6 offset-3">
        <div class="card">
            <div class="card-header">
               <i class="fas fa-user-tie"></i> New User
            </div>
            <div class="card-body">
                <div class="alert alert-info alert-dismissible fade show" role="alert" v-if="message">
                    <button type="button" @click="clearMsg" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div >{{message}}</div>
                </div>
                <form @submit.prevent="saveUser">
                    <div class="form-group">
                        <label>Name</label>
                        <input class="form-control" v-model="name" id="name" type="text">
                        <div v-if="errors.name" class="text-danger">{{errors.name[0]}}</div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" v-model="email" id="email" type="email">
                        <div v-if="errors.email" class="text-danger">{{errors.email[0]}}</div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" v-model="password" id="password" type="password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-outline-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "new-user",
        data(){
            return{
                name:'',
                email:'',
                password:'',
                errors:[],
                message:null,
            }
        },
        methods:{
            clearErr(){
              this.errors=null;
            },
            saveUser()
            {
                axios.post("http://localhost:8000/api/post",{
                    name:this.name,
                    email:this.email,
                    password:this.password
                })
                    .then(res=>{
                        this.message=res.data.message;
                    })
                    .catch(err=>{
                        this.errors=err.response.data.errors;
                    })
            }
        }
    }
</script>

<style scoped>

</style>