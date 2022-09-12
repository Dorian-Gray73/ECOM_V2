import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';
import LigneTransactionService from './ligne-transaction.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class LigneTransactionDetails extends Vue {
  @Inject('ligneTransactionService') private ligneTransactionService: () => LigneTransactionService;
  @Inject('alertService') private alertService: () => AlertService;

  public ligneTransaction: ILigneTransaction = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ligneTransactionId) {
        vm.retrieveLigneTransaction(to.params.ligneTransactionId);
      }
    });
  }

  public retrieveLigneTransaction(ligneTransactionId) {
    this.ligneTransactionService()
      .find(ligneTransactionId)
      .then(res => {
        this.ligneTransaction = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
