import Vue from 'vue';
import { Component, Inject, Provide } from 'vue-property-decorator';
import { email, helpers, maxLength, minLength, required, sameAs } from 'vuelidate/lib/validators';
import LoginService from '@/account/login.service';
import RegisterService from '@/account/register/register.service';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '@/constants';
import { Type } from '@/shared/model/enumerations/type.model';

const loginPattern = helpers.regex('alpha', /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/);
const validations: any = {
  registerAccount: {
    login: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
      pattern: loginPattern,
    },
    email: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(254),
      email,
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254),
    },
  },
  registerUtilisateur: {
    nom: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(30),
    },
    prenom: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(30),
    },
    adresse: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(100),
    },
  },
  confirmPassword: {
    required,
    minLength: minLength(4),
    maxLength: maxLength(50),
    // prettier-ignore
    sameAsPassword: sameAs(function() {
      return this.registerAccount.password;
    }),
  },
};

@Component({
  validations,
})
export default class Register extends Vue {
  @Inject('registerService') private registerService: () => RegisterService;
  @Inject('loginService') private loginService: () => LoginService;
  @Provide('utilisateurService') private utilisateurService = () => new UtilisateurService();
  public registerAccount: any = {
    login: undefined,
    email: undefined,
    password: undefined,
  };
  public registerUtilisateur: any = {
    nom: undefined,
    prenom: undefined,
    adresse: undefined,
    type: Type.Acheteur,
    courriel: undefined,
    internal_user: undefined,
  };
  public confirmPassword: any = null;
  public error = '';
  public errorEmailExists = '';
  public errorUserExists = '';
  public success = false;

  public register(): void {
    this.error = null;
    this.errorUserExists = null;
    this.errorEmailExists = null;
    this.registerAccount.langKey = this.$store.getters.currentLanguage;
    this.registerUtilisateur.langKey = this.$store.getters.currentLanguage;
    this.registerService()
      .processRegistration(this.registerAccount)
      .then(res => {
        this.success = true;
        this.registerUtilisateur.courriel = this.registerAccount.email;
        this.registerUtilisateur.internal_user = res.data;
        this.utilisateurService()
          .create(this.registerUtilisateur)
          .then(() => {
            this.success = true;
          })
          .catch(error => {
            this.success = null;
            this.error = 'ERROR';
          });
      })
      .catch(error => {
        this.success = null;
        if (error.response.status === 400 && error.response.data.type === LOGIN_ALREADY_USED_TYPE) {
          this.errorUserExists = 'ERROR';
        } else if (error.response.status === 400 && error.response.data.type === EMAIL_ALREADY_USED_TYPE) {
          this.errorEmailExists = 'ERROR';
        } else {
          this.error = 'ERROR';
        }
      });
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }
}
