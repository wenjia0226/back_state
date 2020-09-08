import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/Login'
import Analysis from '@/components/analysis/index.vue'
import Studentsetting from '@/components/studentsetting/index.vue'
import Classsetting from '@/components/classsetting/index.vue'
import Recordsetting from '@/components/recordsetting/index.vue'
import First from '@/components/first/index.vue'
import History from '@/components/first/history.vue'
import Online from '@/components/online/index'
import detailSeat from '@/components/detailSeat/index.vue'
import seatQuery from '@/components/seatQuery/index.vue'
import onlineSeat from '@/components/onlineSeat/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
     {path: '/', redirect: '/login'},
     {path: '/login',component: Login},
     {path: '/detailSeat/',component: detailSeat},
	   {path: '/onlineSeat/',component: onlineSeat},
     {
       path: '/home',
       component: Home,
       children: [
         {path: '/first', component: First },
         {path: '/history', component: History},
         {path: '/studentsetting', component: Studentsetting},
         {path: '/classsetting', component: Classsetting},
         {path: '/recordsetting', component: Recordsetting},
         {path: '/analysis', component: Analysis},
         {path: '/online', component: Online},
         {path: '/detailSeat', component: detailSeat},
         {path: '/seatQuery', component: seatQuery},
       ]
     }
  ]
})
