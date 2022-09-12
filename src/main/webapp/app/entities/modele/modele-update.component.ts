import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ProduitService from '@/entities/produit/produit.service';
import { IProduit } from '@/shared/model/produit.model';

import { IModele, Modele } from '@/shared/model/modele.model';
import ModeleService from './modele.service';

const validations: any = {
  modele: {
    modele: {},
  },
};

@Component({
  validations,
})
export default class ModeleUpdate extends Vue {
  @Inject('modeleService') private modeleService: () => ModeleService;
  @Inject('alertService') private alertService: () => AlertService;

  public modele: IModele = new Modele();

  @Inject('produitService') private produitService: () => ProduitService;

  public produits: IProduit[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.modeleId) {
        vm.retrieveModele(to.params.modeleId);
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
    if (this.modele.id) {
      this.modeleService()
        .update(this.modele)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.modele.updated', { param: param.id });
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
      this.modeleService()
        .create(this.modele)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomV2App.modele.created', { param: param.id });
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

  public retrieveModele(modeleId): void {
    this.modeleService()
      .find(modeleId)
      .then(res => {
        this.modele = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.produitService()
      .retrieve()
      .then(res => {
        this.produits = res.data;
      });
  }
}
