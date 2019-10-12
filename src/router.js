import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from './components/Welcome'
import About from './components/About'
import NewUser from './components/new-user'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            component:Welcome
        },
        {
            path:'/about',
            component:About
        },
        {
            path:'/new-user',
            component:NewUser
        }
    ]
})