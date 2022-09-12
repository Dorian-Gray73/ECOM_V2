import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
import { ICaracteristique } from '@/shared/model/caracteristique.model';

import ProduitService from '@/entities/produit/produit.service';
import { IProduit } from '@/shared/model/produit.model';

import { IImage, Image } from '@/shared/model/image.model';
import ImageService from './image.service';

const validations: any = {
  image: {
    lienImage: {},
  },
};

@Component({
  validations,
})
export default class ImageUpdate extends Vue {
  @Inject('imageService') private imageService: () => ImageService;
  @Inject('alertService') private alertService: () => AlertService;

  public image: IImage = new Image();

  @Inject('caracteristiqueService') private caracteristiqueService: () => CaracteristiqueService;

  public caracteristiques: ICaracteristique[] = [];

  @Inject('produitService') private produitService: () => ProduitService;

  public produits: IProduit[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.imageId) {
        vm.retrieveImage(to.params.imageId);
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
    if (this.image.id) {
      this.imageService()
        .update(this.image)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.image.updated', { param: param.id });
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
      this.imageService()
        .create(this.image)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.image.created', { param: param.id });
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

  public retrieveImage(imageId): void {
    this.imageService()
      .find(imageId)
      .then(res => {
        this.image = res;
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
    this.produitService()
      .retrieve()
      .then(res => {
        this.produits = res.data;
      });
  }
}
