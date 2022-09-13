import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IUtilisateur } from '@/shared/model/utilisateur.model';

import UtilisateurService from './utilisateur.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Utilisateur extends Vue {
  @Inject('utilisateurService') private utilisateurService: () => UtilisateurService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public utilisateurs: IUtilisateur[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllUtilisateurs();
  }

  public clear(): void {
    this.retrieveAllUtilisateurs();
  }

  public retrieveAllUtilisateurs(): void {
    this.isFetching = true;
    this.utilisateurService()
      .retrieve()
      .then(
        res => {
          this.utilisateurs = res.data;
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

  public prepareRemove(instance: IUtilisateur): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeUtilisateur(): void {
    this.utilisateurService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('ecomApp.utilisateur.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllUtilisateurs();
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
