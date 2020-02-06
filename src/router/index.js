import Vue from 'vue'
import Router from 'vue-router'
import BasicCalc from '@/components/BasicCalc'
import SciCalc from '@/components/SciCalc'
import Help from '@/components/Help'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Basic Calculator',
      component: BasicCalc
    }, {
      path: '/scicalc',
      name: 'Scientific Calculator',
      component: SciCalc
    }, {
      path: '/help',
      name: 'Help',
      component: Help
    }, {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
