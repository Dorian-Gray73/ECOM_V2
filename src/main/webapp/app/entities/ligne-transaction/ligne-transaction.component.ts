import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';

import LigneTransactionService from './ligne-transaction.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class LigneTransaction extends Vue {
  @Inject('ligneTransactionService') private ligneTransactionService: () => LigneTransactionService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public ligneTransactions: ILigneTransaction[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLigneTransactions();
  }

  public clear(): void {
    this.retrieveAllLigneTransactions();
  }

  public retrieveAllLigneTransactions(): void {
    this.isFetching = true;
    this.ligneTransactionService()
      .retrieve()
      .then(
        res => {
          this.ligneTransactions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ILigneTransaction): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLigneTransaction(): void {
    this.ligneTransactionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('ecomV2App.ligneTransaction.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLigneTransactions();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
