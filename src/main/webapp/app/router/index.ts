import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router, { RouteConfig } from 'vue-router';

const Accueil = () => import('@/core/accueil/accueil.vue');
const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import entities from '@/router/entities';
import pages from '@/router/pages';
import Recherche from '@/core/recherche/recherche.vue';
import Panier from '@/core/panier/panier.vue';
import Produit from '@/core/produit/produit.vue';
import Home from '@/core/home/home.vue';

Vue.use(Router);

// prettier-ignore
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/recherche',
      name: 'Recherche',
      component: Recherche
    },
    {
      path: '/produitDetails',
      name: 'ProduitDetails',
      component: Produit
    },
    {
      path: '/panier',
      name: 'Panier',
      component: Panier
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    ...account,
    ...admin,
    entities,
    ...pages
  ]
});

export default router;
