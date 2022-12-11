import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HelloWorld from '../components/HelloWorld'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Im from '../views/Im.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/im',
      name: 'im',
      component: Im
    }
  ]
})
