import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import UtilisateurService from './utilisateur/utilisateur.service';
import ProduitService from './produit/produit.service';
import CaracteristiqueService from './caracteristique/caracteristique.service';
import TransactionService from './transaction/transaction.service';
import LigneTransactionService from './ligne-transaction/ligne-transaction.service';
import ImageService from './image/image.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('utilisateurService') private utilisateurService = () => new UtilisateurService();
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('caracteristiqueService') private caracteristiqueService = () => new CaracteristiqueService();
  @Provide('transactionService') private transactionService = () => new TransactionService();
  @Provide('ligneTransactionService') private ligneTransactionService = () => new LigneTransactionService();
  @Provide('imageService') private imageService = () => new ImageService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
