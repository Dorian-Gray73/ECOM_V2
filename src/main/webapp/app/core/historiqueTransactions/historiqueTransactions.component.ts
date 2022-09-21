import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import ProduitService from '@/entities/produit/produit.service';
import AlertService from '@/shared/alert/alert.service';
import TransactionService from '@/entities/transaction/transaction.service';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import { ITransaction } from '@/shared/model/transaction.model';

@Component
export default class HistoriqueTransactions extends Vue {
  public historique = [];
  public utilisateur = null;
  public isFetching = false;

  @Provide('utilisateurService')
  private utilisateurService = () => new UtilisateurService();
  @Provide('transactionService')
  private transactionService = () => new TransactionService();
  @Inject('alertService')
  private alertService: () => AlertService;

  public mounted(): void {
    this.retriveAllHistoriqueTransactions();
  }

  public clear(): void {
    this.retriveAllHistoriqueTransactions();
  }

  public retriveAllHistoriqueTransactions() {
    console.log(this.$store.getters.account);
    // Récupération de l'utilisateur courant
    this.utilisateurService()
      .retrieveUtilisateurByUserId(this.$store.getters.account.id)
      .then(res => {
        this.utilisateur = res.data;
        console.log(this.utilisateur);
        this.isFetching = true;
        this.transactionService()
          .retrieveTransactionsByIdUtilisateur(this.utilisateur.id)
          .then(
            res => {
              this.historique = res;
              console.log(this.historique);
              this.isFetching = false;
            },
            err => {
              this.isFetching = false;
              this.alertService().showHttpError(this, err.response);
            }
          );
      })
      .catch(error => {
        this.isFetching = false;
        this.alertService().showHttpError(this, error.response);
      });
  }
}
