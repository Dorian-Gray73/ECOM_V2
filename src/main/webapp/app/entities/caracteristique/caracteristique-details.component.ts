import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICaracteristique } from '@/shared/model/caracteristique.model';
import CaracteristiqueService from './caracteristique.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CaracteristiqueDetails extends Vue {
  @Inject('caracteristiqueService') private caracteristiqueService: () => CaracteristiqueService;
  @Inject('alertService') private alertService: () => AlertService;

  public caracteristique: ICaracteristique = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.caracteristiqueId) {
        vm.retrieveCaracteristique(to.params.caracteristiqueId);
      }
    });
  }

  public retrieveCaracteristique(caracteristiqueId) {
    this.caracteristiqueService()
      .find(caracteristiqueId)
      .then(res => {
        this.caracteristique = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
