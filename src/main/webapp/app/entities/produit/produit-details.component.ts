import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProduit } from '@/shared/model/produit.model';
import ProduitService from './produit.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ProduitDetails extends Vue {
  @Inject('produitService') private produitService: () => ProduitService;
  @Inject('alertService') private alertService: () => AlertService;

  public produit: IProduit = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.produitId) {
        vm.retrieveProduit(to.params.produitId);
      }
    });
  }

  public retrieveProduit(produitId) {
    this.produitService()
      .find(produitId)
      .then(res => {
        this.produit = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
