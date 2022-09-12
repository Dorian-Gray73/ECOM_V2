import { Component, Vue, Inject } from 'vue-property-decorator';

import { IModele } from '@/shared/model/modele.model';
import ModeleService from './modele.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ModeleDetails extends Vue {
  @Inject('modeleService') private modeleService: () => ModeleService;
  @Inject('alertService') private alertService: () => AlertService;

  public modele: IModele = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.modeleId) {
        vm.retrieveModele(to.params.modeleId);
      }
    });
  }

  public retrieveModele(modeleId) {
    this.modeleService()
      .find(modeleId)
      .then(res => {
        this.modele = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
