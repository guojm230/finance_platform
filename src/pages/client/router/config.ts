/**
 * 静态路由配置
 * @type {*[]}
 */
import {Route, RouteConfig} from "vue-router";
import sec from '@/security/SecurityUtils'
import NotFoundPage from "@/components/error/Error_404.vue"
import LoginPage from "../views/public/Login.vue"
import SignUpPage from "../views/public/SignUp.vue"

import nprogress from 'nprogress'

const constPublicRoutes: Array<RouteConfig> = [
  {
    path:"/",
    name:"PublicMain",
    redirect:"/index",
    component:()=> import("../views/public/PublicMain.vue"),
    children:[
      {
        path:"index",
        name:"PublicHome",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/Home.vue")
      },
      {
        path:"products",
        name:"PublicProduct",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/Product.vue")
      },
      {
        path:"news",
        name:"PublicNews",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/information/News.vue")
      },
      {
        path:"policies",
        name:"PublicPolicy",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/information/Policy.vue")
      },
      {
        path:"examples",
        name:"PublicExample",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/information/Example.vue")
      },
      {
        path:"institutions",
        name:"PublicInstitution",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/Institution.vue")
      },
      {
        path:"about",
        name:"PublicAbout",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/About.vue")
      },
      {
        path:"products/:id",
        name:"ProductDetail",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/ProductDetail.vue")
      },
      {
        path:"statistic/:type",
        name:"Statistic",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/statistic/StatisticDetail.vue")
      },
      {
        path:"article/:id",
        name:"Article",
        meta:{
          authentication: false
        },
        component:()=> import("../views/public/information/ArticleDetail.vue")
      },
      {
        path:"register",
        name:"Register",
        meta:{
          authentication: false
        },
        component: ()=> import("../views/public/Register.vue")
      },
      {
        path:"rest/password",
        name:"RestPassword",
        meta:{
          authentication: false
        },
        component: ()=> import("../views/public/RestPassword.vue")
      }
    ]
  },
  {
    path:"/user",
    name:"UserMain",
    redirect:"/user/demand",
    meta:{
      authentication: true
    },
    component:()=> import("../views/user/UserMain.vue"),
    children:[
    //     {
    //   path:"message",
    //   name:"UserMessage",
    //   meta:{
    //     authentication:true,
    //     type:"user"
    //   },
    //   component: ()=> import("../views/user/MessageCenter.vue")
    // },
      {
      path:"demand",
      name:"UserDemand",
      meta:{
        authentication:true,
        type:"user"
      },
      component: ()=> import("../views/user/Demand.vue")
    },
      {
        path:"products",
        name:"UserProduct",
        meta:{
          authentication:true,
          type:"user"
        },
        component: ()=> import("../views/user/Product.vue")
      },
      {
        path:"products/:id",
        name:"UserProductDetail",
        meta:{
          authentication:true,
          type:"user"
        },
        component: ()=> import("../views/user/ProductDetail.vue")
      },
      {
        path:"company",
        name:"CompanyInfo",
        meta:{
          authentication:true,
          type:"user"
        },
        component: ()=> import("../views/user/CompanyInfo.vue")
      },
      {
        path:"profile",
        name:"ProfileInfo",
        meta:{
          authentication:true,
          type:"user"
        },
        component: ()=> import("../views/user/ProfileInfo.vue")
      },
      {
        path:"verify",
        name:"UserVerify",
        meta:{
          authentication:true,
          type:"user"
        },
        component: ()=> import("../views/user/Verify.vue")
      },
      {
        path:"rest/password",
        name:"UserRestPassword",
        meta:{
          authentication: true
        },
        component: ()=> import("../views/public/RestPassword.vue")
      }
    ]
  },
  {
    path:"/login",
    name:"Login",
    meta:{
      authentication:false
    },
    component: LoginPage
  },
  {
    path:"/sign-up",
    name:"SignUp",
    meta:{
      authentication:false
    },
    component: SignUpPage
  },
  {
    path: "/not-found",
    name:"notFound",
    component: NotFoundPage
  }
];

nprogress.inc(0.2);
nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false });


/**
 * 在拦截中不要使用push()来进行跳转，否则会使浏览器的后退按钮失效
 */
export const beforeEachHandler = function(to:Route,from: Route,next: any){
  nprogress.start();
  if (to.meta.authentication){
    //判断是否有身份凭证
    if (!sec.isAuthenticated()){
      next({name:"Login",params:{from:from.path ? from.path : "/"}})
    }else{
      next();
    }
    return;
  }

  if (to.matched.length === 0){
    next({name:"notFound"});
    return;
  }

  next();
};

export const afterHandler = ()=>{
  nprogress.done();
};

export default constPublicRoutes;

