import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import TransactionService from '@/entities/transaction/transaction.service';
import { ITransaction } from '@/shared/model/transaction.model';

import { IUtilisateur, Utilisateur } from '@/shared/model/utilisateur.model';
import UtilisateurService from './utilisateur.service';
import { Type } from '@/shared/model/enumerations/type.model';

const validations: any = {
  utilisateur: {
    nom: {},
    prenom: {},
    courriel: {},
    adresse: {},
    type: {},
  },
};

@Component({
  validations,
})
export default class UtilisateurUpdate extends Vue {
  @Inject('utilisateurService') private utilisateurService: () => UtilisateurService;
  @Inject('alertService') private alertService: () => AlertService;

  public utilisateur: IUtilisateur = new Utilisateur();

  @Inject('transactionService') private transactionService: () => TransactionService;

  public transactions: ITransaction[] = [];
  public typeValues: string[] = Object.keys(Type);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.utilisateurId) {
        vm.retrieveUtilisateur(to.params.utilisateurId);
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
    if (this.utilisateur.id) {
      this.utilisateurService()
        .update(this.utilisateur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomApp.utilisateur.updated', { param: param.id });
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
      this.utilisateurService()
        .create(this.utilisateur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('ecomApp.utilisateur.created', { param: param.id });
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

  public retrieveUtilisateur(utilisateurId): void {
    this.utilisateurService()
      .find(utilisateurId)
      .then(res => {
        this.utilisateur = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.transactionService()
      .retrieve()
      .then(res => {
        this.transactions = res.data;
      });
  }
}
