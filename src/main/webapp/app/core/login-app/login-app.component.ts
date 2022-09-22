import { Component, Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import LoginForm from '@/account/login-form/login-form.vue';
import AccountService from '@/account/account.service';
import axios from 'axios';

@Component({
  components: {
    'login-form': LoginForm,
  },
})
export default class LoginApp extends Vue {
  // Call Service
  @Inject('accountService')
  private accountService: () => AccountService;

  // Data
  public authenticationError = null;
  public login = null;
  public password = null;
  public rememberMe: boolean = null;

  public doLogin(): void {
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
            sessionStorage.removeItem('jhi-authenticationToken');
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
            localStorage.removeItem('jhi-authenticationToken');
          }
        }
        this.authenticationError = false;
        this.accountService().retrieveAccount();
        this.$router.push({ name: 'Catalogue' });
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
