import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/userStore.ts'
import BlogView from '../views/BlogView.vue'
import { useAuthDialogStore } from '../stores/authDialogStore.ts'
import { storeToRefs } from 'pinia'
import BlogEditor from '../views/BlogEditor.vue'
import { fetchBlog } from '../api/blogsApi.ts'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog/:slug',
    name: 'blog',
    component: BlogView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/blog/create/',
    name: 'blogCreate',
    component: BlogEditor,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/blog/:slug/edit',
    name: 'blogEdit',
    component: BlogEditor,
    meta: {
      requiresAuth: true,
      requiresOwner: true
    }
  },
  {
    path: '/:catchall(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const userStore = useUserStore()
  if (userStore.userLoggedIn) {
    if (to.meta.requiresOwner) {
      const blog = await fetchBlog(to.params.slug)
      if (blog.author === userStore.username) {
        next()
      } else {
        next({ name: 'home' })
      }
    } else {
      next()
    }
  } else {
    const authDialogStore = useAuthDialogStore()
    const { isDialogOpen } = storeToRefs(authDialogStore)
    isDialogOpen.value = true
    next({ name: 'home' })
  }
})

export default router
