import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Utilisateur = () => import('@/entities/utilisateur/utilisateur.vue');
// prettier-ignore
const UtilisateurUpdate = () => import('@/entities/utilisateur/utilisateur-update.vue');
// prettier-ignore
const UtilisateurDetails = () => import('@/entities/utilisateur/utilisateur-details.vue');
// prettier-ignore
const Produit = () => import('@/entities/produit/produit.vue');
// prettier-ignore
const ProduitUpdate = () => import('@/entities/produit/produit-update.vue');
// prettier-ignore
const ProduitDetails = () => import('@/entities/produit/produit-details.vue');
// prettier-ignore
const Caracteristique = () => import('@/entities/caracteristique/caracteristique.vue');
// prettier-ignore
const CaracteristiqueUpdate = () => import('@/entities/caracteristique/caracteristique-update.vue');
// prettier-ignore
const CaracteristiqueDetails = () => import('@/entities/caracteristique/caracteristique-details.vue');
// prettier-ignore
const Transaction = () => import('@/entities/transaction/transaction.vue');
// prettier-ignore
const TransactionUpdate = () => import('@/entities/transaction/transaction-update.vue');
// prettier-ignore
const TransactionDetails = () => import('@/entities/transaction/transaction-details.vue');
// prettier-ignore
const LigneTransaction = () => import('@/entities/ligne-transaction/ligne-transaction.vue');
// prettier-ignore
const LigneTransactionUpdate = () => import('@/entities/ligne-transaction/ligne-transaction-update.vue');
// prettier-ignore
const LigneTransactionDetails = () => import('@/entities/ligne-transaction/ligne-transaction-details.vue');
// prettier-ignore
const Image = () => import('@/entities/image/image.vue');
// prettier-ignore
const ImageUpdate = () => import('@/entities/image/image-update.vue');
// prettier-ignore
const ImageDetails = () => import('@/entities/image/image-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'utilisateur',
      name: 'Utilisateur',
      component: Utilisateur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'utilisateur/new',
      name: 'UtilisateurCreate',
      component: UtilisateurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'utilisateur/:utilisateurId/edit',
      name: 'UtilisateurEdit',
      component: UtilisateurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'utilisateur/:utilisateurId/view',
      name: 'UtilisateurView',
      component: UtilisateurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit',
      name: 'Produit',
      component: Produit,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit/new',
      name: 'ProduitCreate',
      component: ProduitUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit/:produitId/edit',
      name: 'ProduitEdit',
      component: ProduitUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit/:produitId/view',
      name: 'ProduitView',
      component: ProduitDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caracteristique',
      name: 'Caracteristique',
      component: Caracteristique,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caracteristique/new',
      name: 'CaracteristiqueCreate',
      component: CaracteristiqueUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caracteristique/:caracteristiqueId/edit',
      name: 'CaracteristiqueEdit',
      component: CaracteristiqueUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caracteristique/:caracteristiqueId/view',
      name: 'CaracteristiqueView',
      component: CaracteristiqueDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'transaction',
      name: 'Transaction',
      component: Transaction,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'transaction/new',
      name: 'TransactionCreate',
      component: TransactionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'transaction/:transactionId/edit',
      name: 'TransactionEdit',
      component: TransactionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'transaction/:transactionId/view',
      name: 'TransactionView',
      component: TransactionDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-transaction',
      name: 'LigneTransaction',
      component: LigneTransaction,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-transaction/new',
      name: 'LigneTransactionCreate',
      component: LigneTransactionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-transaction/:ligneTransactionId/edit',
      name: 'LigneTransactionEdit',
      component: LigneTransactionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-transaction/:ligneTransactionId/view',
      name: 'LigneTransactionView',
      component: LigneTransactionDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image',
      name: 'Image',
      component: Image,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image/new',
      name: 'ImageCreate',
      component: ImageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image/:imageId/edit',
      name: 'ImageEdit',
      component: ImageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image/:imageId/view',
      name: 'ImageView',
      component: ImageDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
