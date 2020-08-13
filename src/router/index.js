import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue'
import Category from '../views/category/Category.vue'
import Cart from '../views/cart/Cart.vue'
import Profile from '../views/profile/Profile.vue'
import News from '../views/news/News.vue'
import Phone from '../views/phone/Phone.vue'
import Detail from '../views/detail/Detail.vue'
//const Cart = () => import('../views/cart/Cart');
// const Category = () => import('../views/category/Category');
// const Profile = () => import('../views/profile/Profile');
// const Detail = () => import('../views/detail/Detail');

Vue.use(VueRouter)

//解决导航栏中重复点击菜单报错问题
const originalPush = VueRouter.prototype.replace;
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // {
  //    path: '',
  //    redirect: '/home',
  // },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/phone',
    name: 'Phone',
    component: Phone
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: Detail,
  }
]


const router = new VueRouter({
  mode: 'hash', //去掉地址栏#
  base: process.env.BASE_URL,
  routes
})

//重定向到home，同等于上面的redirect
router.replace('/home')
export default router
