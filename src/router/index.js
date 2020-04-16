import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/index',
        name: 'root',
        component: () => import('../views/Main.vue'),
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('../views/Projects.vue'),
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/Users.vue'),
      }, {
        path: 'admins',
        name: 'admins',
        component: () => import('../views/Admins.vue'),
      },
      {
        path: 'messages',
        name: 'messages',
        component: () => import('../views/Messages.vue'),
      },
      {
        path: 'createpost',
        name: 'createpost',
        component: () => import('../views/CreatePost.vue'),
      },
      {
        path: 'postlist',
        name: 'postlist',
        component: () => import('../views/PostList.vue'),
      },
      {
        path: 'editpost/:id',
        name: 'editpost',
        component: () => import('../views/EditPost.vue'),
      },
      {
        path: 'postdetail/:id',
        name: 'postdetail',
        component: () => import('../views/PostDetail.vue'),
      },
      {
        path: 'bannerlist',
        name: 'bannerlist',
        component: () => import('../views/BannerList.vue'),
      },
      {
        path: 'banneradd',
        name: 'banneradd',
        component: () => import('../views/BannerAdd.vue'),
      },
      {
        path: 'banneredit/:id',
        name: 'banneredit',
        component: () => import('../views/EditBanner.vue'),
      },
      {
        path: 'links',
        name: 'links',
        component: () => import('../views/Link.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/Forget.vue'),
    meta: { isPublic: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//使用路由守卫，对需要用户权限的页面进行登录操作
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    Vue.prototype.$message({
      type: 'error',
      message: '请先登录'
    })
    return next('/login')
  }
  next()
})
export default router
