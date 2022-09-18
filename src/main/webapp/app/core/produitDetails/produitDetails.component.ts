import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';

@Component
export default class ProduitDetails extends Vue {
  @Provide('produitService') private produitService = () => new ProduitService();
  @Inject('alertService') private alertService: () => AlertService;

  public produit: IProduit = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.id) {
        vm.retrieveProduit(to.params.id);
      }
    });
  }

  public mounted(): void {
    this.retriveProduit(this.$route.params.id);
  }

  public clear(): void {
    this.retriveProduit(this.$route.params.id);
  }

  public retriveProduit(produitId) {
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

  public addProduit(produit): void {
    this.$store.commit('addProduit', produit);
    console.log(this.$store.state);
    console.log(this.$store.getters.nbProduit);
    console.log(this.$store.getters.panier);
    console.log(this.$store.getters.quantite);
  }
}
