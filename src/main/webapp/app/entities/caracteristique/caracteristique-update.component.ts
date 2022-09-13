import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ImageService from '@/entities/image/image.service';
import { IImage } from '@/shared/model/image.model';

import ProduitService from '@/entities/produit/produit.service';
import { IProduit } from '@/shared/model/produit.model';

import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';

import { ICaracteristique, Caracteristique } from '@/shared/model/caracteristique.model';
import CaracteristiqueService from './caracteristique.service';

const validations: any = {
  caracteristique: {
    couleur: {},
    quantite: {},
  },
};

@Component({
  validations,
})
export default class CaracteristiqueUpdate extends Vue {
  @Inject('caracteristiqueService') private caracteristiqueService: () => CaracteristiqueService;
  @Inject('alertService') private alertService: () => AlertService;

  public caracteristique: ICaracteristique = new Caracteristique();

  @Inject('imageService') private imageService: () => ImageService;

  public images: IImage[] = [];

  @Inject('produitService') private produitService: () => ProduitService;

  public produits: IProduit[] = [];

  @Inject('ligneTransactionService') private ligneTransactionService: () => LigneTransactionService;

  public ligneTransactions: ILigneTransaction[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.caracteristiqueId) {
        vm.retrieveCaracteristique(to.params.caracteristiqueId);
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
    if (this.caracteristique.id) {
      this.caracteristiqueService()
        .update(this.caracteristique)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.caracteristique.updated', { param: param.id });
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
      this.caracteristiqueService()
        .create(this.caracteristique)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.caracteristique.created', { param: param.id });
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

  public retrieveCaracteristique(caracteristiqueId): void {
    this.caracteristiqueService()
      .find(caracteristiqueId)
      .then(res => {
        this.caracteristique = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.imageService()
      .retrieve()
      .then(res => {
        this.images = res.data;
      });
    this.produitService()
      .retrieve()
      .then(res => {
        this.produits = res.data;
      });
    this.ligneTransactionService()
      .retrieve()
      .then(res => {
        this.ligneTransactions = res.data;
      });
  }
}
