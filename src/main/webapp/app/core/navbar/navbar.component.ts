import { Component, Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';

@Component
export default class Navbar extends Vue {
  public nbPanier = null;

  //Appel du service
  @Inject('loginService')
  private loginService: () => LoginService;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get nbProduit(): number {
    console.log(this.$store.state.nbProduit);
    return this.$store.state.nbProduit;
  }
}
