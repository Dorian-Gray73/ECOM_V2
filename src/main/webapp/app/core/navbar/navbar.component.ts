import { Component, Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';

@Component
export default class Navbar extends Vue {
  // Data
  public nbPanier = null;
  private hasAnyAuthorityValues = {};

  // Service
  @Inject('accountService') private accountService: () => AccountService;

  // Appel du service
  @Inject('loginService')
  private loginService: () => LoginService;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  // Nombre de produits dans le panier
  public get nbProduit(): number {
    return this.$store.state.nbProduit;
  }

  // Vérification des rôles
  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        if (this.hasAnyAuthorityValues[authorities] !== value) {
          this.hasAnyAuthorityValues = { ...this.hasAnyAuthorityValues, [authorities]: value };
        }
      });
    return this.hasAnyAuthorityValues[authorities] ?? false;
  }

  // Vérif si on est authentifié
  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  // Déconnexion
  public logout(): Promise<any> {
    localStorage.removeItem('jhi-authenticationToken');
    sessionStorage.removeItem('jhi-authenticationToken');
    this.$store.commit('logout');
    if (this.$route.path !== '/') {
      return this.$router.push('/');
    }
    return Promise.resolve(this.$router.currentRoute);
  }
}
