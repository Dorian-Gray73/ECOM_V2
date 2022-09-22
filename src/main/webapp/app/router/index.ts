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
import Catalogue from '@/core/catalogue/catalogue.vue';
import Connexion from '@/core/connexion/connexion.vue';
import Confirmation from '@/core/confirmation/confirmation.vue';
import Paiement from '@/core/paiement/paiement.vue';
import aPropos from '@/core/aPropos/aPropos.vue';
import LoginApp from '@/core/login-app/login-app.vue';
import HistoriqueTransactions from '@/core/historiqueTransactions/historiqueTransactions.vue';
import { Authority } from '@/shared/security/authority';

Vue.use(Router);

// prettier-ignore
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Catalogue',
      component: Catalogue,
    },
    {
      path: '/apropos',
      name: 'A propos',
      component: aPropos
    },
    {
      path: '/admin',
      name: 'Home',
      component: Home,
      meta: {authorities: [Authority.ADMIN]},
    },
    {
      path: '/recherche',
      name: 'Recherche',
      component: Recherche
    },
    {
      path: '/historiqueTransactions',
      name: 'HistoriqueTransactions',
      component: HistoriqueTransactions,
      meta: {authorities: [Authority.ADMIN, Authority.USER]},
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
      path: '/loginapp',
      name: 'LoginApp',
      component: LoginApp
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: Connexion
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: Confirmation,
      meta: {authorities: [Authority.ADMIN, Authority.USER]},
    },
    {
      path: '/paiement',
      name: 'Paiement',
      component: Paiement,
      meta: {authorities: [Authority.ADMIN, Authority.USER]},
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
