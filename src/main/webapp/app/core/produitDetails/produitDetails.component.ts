import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
import { Caracteristique, ICaracteristique } from '@/shared/model/caracteristique.model';
import { computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

library.add(faVolumeUp);

@Component
export default class ProduitDetails extends Vue {
  // Appel Service
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('caracteristiqueService') private caracteristiqueService = () => new CaracteristiqueService();
  @Inject('alertService') private alertService: () => AlertService;

  // Data
  public caracteristique: Caracteristique = {};
  public caracteristiques = [];
  public componentKey = 0;
  public componentKey2 = 1;

  /*beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.id) {
        vm.retrieveProduit(to.params.id);
      }
    });
  }*/

  public mounted(): void {
    this.retrieveCaracteristiques(this.$route.params.id);
  }

  public clear(): void {
    this.retrieveCaracteristiques(this.$route.params.id);
  }

  //Forcer l'affichage des produits à se mettre à jour
  public forceRerender() {
    this.componentKey += 1;
    this.componentKey2 += 1;
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
    this.forceRerender();
    const message = 'Produit ajouté au panier';
    (this.$root as any).$bvToast.toast(message.toString(), {
      toaster: 'b-toaster-top-center',
      variant: 'success',
      solid: true,
      autoHideDelay: 5000,
    });
  }

  public changeCaracteristique(idCaracteristique): void {
    this.caracteristiques.forEach(e => {
      if (e.id == idCaracteristique) {
        this.caracteristique = e;
      }
    });
  }

  // Bouton retour
  public previousState() {
    this.$router.go(-1);
  }
}
