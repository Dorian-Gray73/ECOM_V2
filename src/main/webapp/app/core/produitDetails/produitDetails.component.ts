import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
import { Caracteristique, ICaracteristique } from '@/shared/model/caracteristique.model';
import { computed } from 'vue';

@Component
export default class ProduitDetails extends Vue {
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('caracteristiqueService') private caracteristiqueService = () => new CaracteristiqueService();
  @Inject('alertService') private alertService: () => AlertService;

  public caracteristique: Caracteristique = {};
  public caracteristiques = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.id) {
        vm.retrieveProduit(to.params.id);
      }
    });
  }

  public mounted(): void {
    this.retrieveCaracteristiques(this.$route.params.id);
  }

  public clear(): void {
    this.retrieveCaracteristiques(this.$route.params.id);
  }

  public retrieveCaracteristiques(produitId) {
    this.caracteristiqueService()
      .retrieveCaracteristiquesParProduit(produitId)
      .then(res => {
        this.caracteristiques = res;
        this.caracteristique = this.caracteristiques[0];
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public addProduit(produit): void {
    this.$store.commit('addProduit', produit);
  }

  public changeCaracteristique(idCaracteristique): void {
    this.caracteristiques.forEach(e => {
      if (e.id == idCaracteristique) {
        this.caracteristique = e;
      }
    });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
