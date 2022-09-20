import { Component, Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import LoginForm from '@/account/login-form/login-form.vue';

@Component({
  components: {
    'login-form': LoginForm,
  },
})
export default class Connexion extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public seConnecter() {
    this.$router.push({ name: 'Paiement' });
  }
}
