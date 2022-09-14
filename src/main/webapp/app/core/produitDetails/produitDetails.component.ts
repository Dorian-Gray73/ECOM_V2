import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import ProduitService from '@/entities/produit/produit.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ProduitDetails extends Vue {
  @Provide('produitService') private produitService = () => new ProduitService();
  @Inject('alertService') private alertService: () => AlertService;

  public produit: IProduit = {};

  beforeRouteEnter(to, from, next) {
    console.log('test');
    next(vm => {
      console.log(to.params);
      if (to.params.id) {
        vm.retrieveProduit(to.params.id);
      }
    });
  }

  public mounted(): void {
    this.retrieveProduit(this.$route.params.id);
  }

  public retrieveProduit(produitId) {
    this.produitService()
      .find(produitId)
      .then(res => {
        this.produit = res;
        console.log(this.produit);
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }
}
