import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Comment from '../views/comment.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cluster/:clusterID',
    name: 'cluster',
    component: () => import(/* webpackChunkName: "about" */ '../views/cluster.vue')
  },
  {
    path: '/comment/:courseCode',
    name: 'Comment',
    component: Comment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
