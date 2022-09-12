import { Component, Vue, Inject } from 'vue-property-decorator';

import { IUtilisateur } from '@/shared/model/utilisateur.model';
import UtilisateurService from './utilisateur.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class UtilisateurDetails extends Vue {
  @Inject('utilisateurService') private utilisateurService: () => UtilisateurService;
  @Inject('alertService') private alertService: () => AlertService;

  public utilisateur: IUtilisateur = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.utilisateurId) {
        vm.retrieveUtilisateur(to.params.utilisateurId);
      }
    });
  }

  public retrieveUtilisateur(utilisateurId) {
    this.utilisateurService()
      .find(utilisateurId)
      .then(res => {
        this.utilisateur = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
