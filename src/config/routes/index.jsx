import {
   Login,
   Register,
   Dashboard,
   // Projects,
   // Analytics,
   // Profile,
   // Settings,
   // ApiKeys,
 } from "../../pages/index";
 
 export const routes = [
   {
     id: 1,
     path: "/login",
     component: Login,
     layout: "empty",
     auth: {
       required: false,
     },
   },
 
   {
     id: 2,
     path: "/register",
     component: Register,
     layout: "empty",
     auth: {
       required: false,
     },
   },
 
   {
     id: 3,
     path: "/",
     component: Dashboard,
     layout: "dashboard",
     auth: {
       required: true,
       roles: ["ADMIN", "DEVELOPER"],
     },
   },
 
   // {
   //   id: 4,
   //   path: "/projects",
   //   component: Projects,
   //   layout: "dashboard",
   //   auth: {
   //     required: true,
   //   },
   // },
 
   // {
   //   id: 5,
   //   path: "/analytics",
   //   component: Analytics,
   //   layout: "dashboard",
   //   auth: {
   //     required: true,
   //   },
   // },
 
   // {
   //   id: 6,
   //   path: "/profile",
   //   component: Profile,
   //   layout: "dashboard",
   //   auth: {
   //     required: true,
   //   },
   // },
 
   // {
   //   id: 7,
   //   path: "/settings",
   //   component: Settings,
   //   layout: "dashboard",
   //   auth: {
   //     required: true,
   //   },
   // },
 
   // {
   //   id: 8,
   //   path: "/api-keys",
   //   component: ApiKeys,
   //   layout: "dashboard",
   //   auth: {
   //     required: true,
   //   },
   // },
 ];