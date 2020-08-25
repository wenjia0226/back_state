import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/Login'
import Analysis from '@/components/analysis/analysis.vue'
import Studentsetting from '@/components/studentsetting/index.vue'
import Classsetting from '@/components/classsetting/index.vue'
import Recordsetting from '@/components/recordsetting/index.vue'
import First from '@/components/first/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
     {path: '/', redirect: '/login'},
     {path: '/login',component: Login},
     {
       path: '/home',
       component: Home,
       children: [
         {path: '/first', component: First },
         {path: '/studentsetting', component: Studentsetting},
         {path: '/classsetting', component: Classsetting},
         {path: '/recordsetting', component: Recordsetting}
       ]
     }
  ]
})
