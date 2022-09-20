import Vue from 'vue';
import Component from 'vue-class-component';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router, { RouteConfig } from 'vue-router';

const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import entities from '@/router/entities';
import pages from '@/router/pages';
import Recherche from '@/core/recherche/recherche.vue';
import Panier from '@/core/panier/panier.vue';
import ProduitDetails from '@/core/produitDetails/produitDetails.vue';
import Recommandations from '@/core/recommandations/recommandations.vue';
import Catalogue from '@/core/catalogue/catalogue.vue';
import Connexion from '@/core/connexion/connexion.vue';
import Confirmation from '@/core/confirmation/confirmation.vue';
import Paiement from '@/core/paiement/paiement.vue';

Vue.use(Router);

// prettier-ignore
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Recommandations',
      component: Recommandations
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
      path: '/catalogue',
      name: 'Catalogue',
      component: Catalogue
    },
    {
      path: '/produitDetails/:id',
      name: 'ProduitDetails',
      component: ProduitDetails
    },
    {
      path: '/panier',
      name: 'Panier',
      component: Panier
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: Connexion
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: Confirmation
    },
    {
      path: '/paiement',
      name: 'Paiement',
      component: Paiement
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: {error403: true}
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: {error404: true}
    },
    ...account,
    ...admin,
    entities,
    ...pages
  ]
});

export default router;
