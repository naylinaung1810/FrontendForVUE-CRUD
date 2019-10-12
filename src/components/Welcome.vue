<template>
    <div class="container mt-3">
        <div class="alert alert-success" v-if="message">
            {{message}}
        </div>
        <h1 class="text-danger">I am Welcome Page</h1>
        <router-link to="/about">About</router-link>

        <div class="card">
            <div class="card-header">
                Users
            </div>
            <div class="card-body">
                <table class="table">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="(user,index) in users">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{beautyTime(user.created_at)}}</td>
                        <td>
                            <i @click="callModal(user,index)" class="fa fa-edit text-info" style="cursor: pointer"></i>
                            <i @click="removeItem(user.id,index)" class="fa fa-trash-alt text-danger" style="cursor: pointer"></i>
                        </td>
                    </tr>
                </table>

                    <ul class="pagination">
                        <li class="page-item">
                            <button :disabled="pagination.current_page==pagination.first_page" @click="fetchData(pagination.path)" class="page-link" type="button" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li class="page-item">
                            <button @click="fetchData(pagination.prev_page_url)" class="page-link" type="button" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">{{pagination.current_page}}</a></li>
                        <li class="page-item"><a class="page-link" href="#">of</a></li>
                        <li class="page-item"><a class="page-link" href="#">{{pagination.last_page}}</a></li>
                        <li class="page-item">
                            <button :disabled="pagination.current_page==pagination.last_page" @click="fetchData(pagination.next_page_url)" class="page-link" type="button" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                        <li class="page-item">
                            <button :disabled="pagination.current_page==pagination.last_page" @click="fetchData(pagination.last_page_url)" class="page-link" type="button" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="updateUser()">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-plus"></i> Edit User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Name</label>
                            <input class="form-control" v-model="name" id="name" type="text">

                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input class="form-control" v-model="email" id="email" type="email">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import Vue from 'vue'
    export default {
        name: "Welcome",

        data(){
            return{
                users:[],
                message:null,
                name:'',
                email:'',
                id:'',
                index:'',
                pagination:{}
            }
        },
        methods:
            {
                updateUser()
                {
                  axios.post("http://localhost:8000/api/post/update",{
                      name:this.name,
                      email:this.email,
                          id:this.id,
                  })
                      .then(res=>{
                          $('#editModal').modal('hide');
                          this.message=res.data.message;
                          Vue.set(this.users,this.index,res.data.user);

                      })
                      .catch(err=>{
                          console.log(err)
                      });
                },
                callModal(user,index){
                    $("#editModal").modal('show');
                    this.name=user.name;
                    this.email=user.email;
                    this.id=user.id;
                    this.index=index;
                },
                removeItem(user_id,index)
                {
                  let result=confirm("Are you sure to delete this item");
                  if(result){
                     axios.get('http://localhost:8000/api/post/delete/'+user_id)
                         .then(res=>{
                             this.users.splice(index,1);
                             this.message=res.data.message;
                         })
                         .catch(err=>{
                             console.log(err)
                         });
                  }
                },

                beautyTime(time)
                {
                    return moment(time).format("MMM Do YY");
                },
                fetchData(page_url){
                    let new_url=page_url || "http://localhost:8000/api/posts";
                    axios.get(new_url)
                        .then(res=>{
                            this.users=res.data.users.data;
                            this.paginate(res.data.users);
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                },
                paginate(myData){
                    let paginate={
                        current_page:myData.current_page,
                        last_page:myData.last_page,
                        first_page_url:myData.first_page_url,
                        next_page_url:myData.next_page_url,
                        last_page_url:myData.last_page_url,
                        prev_page_url:myData.prev_page_url,
                        path:myData.path,
                    };
                    this.pagination=paginate;
                }
            },
        created() {
            this.fetchData();
        }


    }
</script>

