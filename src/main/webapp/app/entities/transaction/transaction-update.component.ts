import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';

import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import { IUtilisateur } from '@/shared/model/utilisateur.model';

import { ITransaction, Transaction } from '@/shared/model/transaction.model';
import TransactionService from './transaction.service';
import { EtatProduit } from '@/shared/model/enumerations/etat-produit.model';

const validations: any = {
  transaction: {
    etat: {},
    date: {},
  },
};

@Component({
  validations,
})
export default class TransactionUpdate extends Vue {
  @Inject('transactionService') private transactionService: () => TransactionService;
  @Inject('alertService') private alertService: () => AlertService;

  public transaction: ITransaction = new Transaction();

  @Inject('ligneTransactionService') private ligneTransactionService: () => LigneTransactionService;

  public ligneTransactions: ILigneTransaction[] = [];

  @Inject('utilisateurService') private utilisateurService: () => UtilisateurService;

  public utilisateurs: IUtilisateur[] = [];
  public etatProduitValues: string[] = Object.keys(EtatProduit);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.transactionId) {
        vm.retrieveTransaction(to.params.transactionId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.transaction.id) {
      this.transactionService()
        .update(this.transaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.transaction.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.transactionService()
        .create(this.transaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.transaction.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveTransaction(transactionId): void {
    this.transactionService()
      .find(transactionId)
      .then(res => {
        this.transaction = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.ligneTransactionService()
      .retrieve()
      .then(res => {
        this.ligneTransactions = res.data;
      });
    this.utilisateurService()
      .retrieve()
      .then(res => {
        this.utilisateurs = res.data;
      });
  }
}
