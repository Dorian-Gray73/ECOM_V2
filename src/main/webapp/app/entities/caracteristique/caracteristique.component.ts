import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICaracteristique } from '@/shared/model/caracteristique.model';

import CaracteristiqueService from './caracteristique.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Caracteristique extends Vue {
  @Inject('caracteristiqueService') private caracteristiqueService: () => CaracteristiqueService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public caracteristiques: ICaracteristique[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCaracteristiques();
  }

  public clear(): void {
    this.retrieveAllCaracteristiques();
  }

  public retrieveAllCaracteristiques(): void {
    this.isFetching = true;
    this.caracteristiqueService()
      .retrieve()
      .then(
        res => {
          this.caracteristiques = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ICaracteristique): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCaracteristique(): void {
    this.caracteristiqueService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('ecomApp.caracteristique.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCaracteristiques();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
