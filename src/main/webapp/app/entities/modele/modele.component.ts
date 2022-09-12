import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IModele } from '@/shared/model/modele.model';

import ModeleService from './modele.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Modele extends Vue {
  @Inject('modeleService') private modeleService: () => ModeleService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public modeles: IModele[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllModeles();
  }

  public clear(): void {
    this.retrieveAllModeles();
  }

  public retrieveAllModeles(): void {
    this.isFetching = true;
    this.modeleService()
      .retrieve()
      .then(
        res => {
          this.modeles = res.data;
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

  public prepareRemove(instance: IModele): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeModele(): void {
    this.modeleService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('ecomV2App.modele.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllModeles();
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
