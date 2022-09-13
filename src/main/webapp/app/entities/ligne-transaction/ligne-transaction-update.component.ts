import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
import { ICaracteristique } from '@/shared/model/caracteristique.model';

import TransactionService from '@/entities/transaction/transaction.service';
import { ITransaction } from '@/shared/model/transaction.model';

import { ILigneTransaction, LigneTransaction } from '@/shared/model/ligne-transaction.model';
import LigneTransactionService from './ligne-transaction.service';

const validations: any = {
  ligneTransaction: {
    quantite: {},
    prixUnitaire: {},
  },
};

@Component({
  validations,
})
export default class LigneTransactionUpdate extends Vue {
  @Inject('ligneTransactionService') private ligneTransactionService: () => LigneTransactionService;
  @Inject('alertService') private alertService: () => AlertService;

  public ligneTransaction: ILigneTransaction = new LigneTransaction();

  @Inject('caracteristiqueService') private caracteristiqueService: () => CaracteristiqueService;

  public caracteristiques: ICaracteristique[] = [];

  @Inject('transactionService') private transactionService: () => TransactionService;

  public transactions: ITransaction[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ligneTransactionId) {
        vm.retrieveLigneTransaction(to.params.ligneTransactionId);
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
    if (this.ligneTransaction.id) {
      this.ligneTransactionService()
        .update(this.ligneTransaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.ligneTransaction.updated', { param: param.id });
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
      this.ligneTransactionService()
        .create(this.ligneTransaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.ligneTransaction.created', { param: param.id });
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

  public retrieveLigneTransaction(ligneTransactionId): void {
    this.ligneTransactionService()
      .find(ligneTransactionId)
      .then(res => {
        this.ligneTransaction = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.caracteristiqueService()
      .retrieve()
      .then(res => {
        this.caracteristiques = res.data;
      });
    this.transactionService()
      .retrieve()
      .then(res => {
        this.transactions = res.data;
      });
  }
}
