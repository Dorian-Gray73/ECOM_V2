import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import UtilisateurService from './utilisateur/utilisateur.service';
import ProduitService from './produit/produit.service';
import ModeleService from './modele/modele.service';
import CaracteristiqueService from './caracteristique/caracteristique.service';
import TransactionService from './transaction/transaction.service';
import LigneTransactionService from './ligne-transaction/ligne-transaction.service';
import ImageService from './image/image.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import LoginForm from '@/account/login-form/login-form.vue';
import Ribbon from '@/core/ribbon/ribbon.vue';

@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,
  },
})
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('utilisateurService') private utilisateurService = () => new UtilisateurService();
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('modeleService') private modeleService = () => new ModeleService();
  @Provide('caracteristiqueService') private caracteristiqueService = () => new CaracteristiqueService();
  @Provide('transactionService') private transactionService = () => new TransactionService();
  @Provide('ligneTransactionService') private ligneTransactionService = () => new LigneTransactionService();
  @Provide('imageService') private imageService = () => new ImageService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
