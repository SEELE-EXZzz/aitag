import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateAiTag from '../pages/CreateAiTag'
import AiTagCard from '../pages/AiTagCard'
import FullAiTag from '../pages/FullAiTag'
import playground from '../pages/playground'
import others from '../pages/others'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
  {
    name:'CreateAiTag',
    path:'/',
    component:CreateAiTag
  },
  {
    name:'AiTagCard',
    path:'/AiTagCard', 
    component:AiTagCard
  },
  {
    name:'FullAiTag',
    path:'/FullAiTag',
    component:FullAiTag
  },
  {
    name:'playground',
    path:'/playground',
    component:playground
  },
  {
    name:'others',
    path:'/others',
    component:others
  }
]
})

export default router
