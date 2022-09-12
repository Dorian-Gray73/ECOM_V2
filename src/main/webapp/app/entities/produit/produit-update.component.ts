import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
import { ICaracteristique } from '@/shared/model/caracteristique.model';

import ImageService from '@/entities/image/image.service';
import { IImage } from '@/shared/model/image.model';

import ModeleService from '@/entities/modele/modele.service';
import { IModele } from '@/shared/model/modele.model';

import { IProduit, Produit } from '@/shared/model/produit.model';
import ProduitService from './produit.service';

const validations: any = {
  produit: {
    nom: {},
    prix: {},
    lienImage: {},
    marque: {},
    progressif: {},
  },
};

@Component({
  validations,
})
export default class ProduitUpdate extends Vue {
  @Inject('produitService') private produitService: () => ProduitService;
  @Inject('alertService') private alertService: () => AlertService;

  public produit: IProduit = new Produit();

  @Inject('caracteristiqueService') private caracteristiqueService: () => CaracteristiqueService;

  public caracteristiques: ICaracteristique[] = [];

  @Inject('imageService') private imageService: () => ImageService;

  public images: IImage[] = [];

  @Inject('modeleService') private modeleService: () => ModeleService;

  public modeles: IModele[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.produitId) {
        vm.retrieveProduit(to.params.produitId);
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
    if (this.produit.id) {
      this.produitService()
        .update(this.produit)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.produit.updated', { param: param.id });
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
      this.produitService()
        .create(this.produit)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.produit.created', { param: param.id });
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

  public retrieveProduit(produitId): void {
    this.produitService()
      .find(produitId)
      .then(res => {
        this.produit = res;
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
    this.imageService()
      .retrieve()
      .then(res => {
        this.images = res.data;
      });
    this.modeleService()
      .retrieve()
      .then(res => {
        this.modeles = res.data;
      });
  }
}
