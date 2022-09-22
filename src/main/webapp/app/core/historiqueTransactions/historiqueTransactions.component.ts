import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import AlertService from '@/shared/alert/alert.service';
import TransactionService from '@/entities/transaction/transaction.service';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';

@Component
export default class HistoriqueTransactions extends Vue {
  // Appel Service
  @Provide('utilisateurService')
  private utilisateurService = () => new UtilisateurService();
  @Provide('transactionService')
  private transactionService = () => new TransactionService();
  @Inject('alertService')
  private alertService: () => AlertService;

  // Data
  public historique = [];
  public utilisateur = null;
  public isFetching = false;
  public isLoading = false;

  public mounted(): void {
    this.retriveAllHistoriqueTransactions();
  }

  public handleSyncList(): void {
    this.clear();
  }

  public clear(): void {
    this.retriveAllHistoriqueTransactions();
  }

  public retriveAllHistoriqueTransactions() {
    this.isLoading = true;
    // Récupération de l'utilisateur courant
    this.utilisateurService()
      .retrieveUtilisateurByUserId(this.$store.getters.account.id)
      .then(res => {
        this.utilisateur = res.data;
        this.isFetching = true;
        this.transactionService()
          .retrieveTransactionsByIdUtilisateur(this.utilisateur.id)
          .then(
            res => {
              this.historique = res;
              this.isFetching = false;
              this.isLoading = false;
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
