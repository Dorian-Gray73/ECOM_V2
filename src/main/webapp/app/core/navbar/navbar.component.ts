import { Component, Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';

@Component
export default class Navbar extends Vue {
  public nbPanier = null;

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
}
