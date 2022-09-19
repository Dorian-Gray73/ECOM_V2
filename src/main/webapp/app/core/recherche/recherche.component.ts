import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';
import AccountService from '@/account/account.service';
import PanierService from '@/panier/panier.service';

@Component
export default class Recherche extends Vue {
  // Call Service
  @Provide('produitService') private produitService = () => new ProduitService();
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('panierService')
  private panierService: () => PanierService;

  // Data
  public produits: IProduit[] = [];
  public isFetching = false;
  public search = '';
  public rows = 100;
  public currentPage = 1;

  public mounted(): void {
    this.retrieveAllProduits();
  }

  public clear(): void {
    this.retrieveAllProduits();
  }

  //Récupération des produits
  public retrieveAllProduits(): void {
    this.isFetching = true;
    this.produitService()
      .retrieve()
      .then(
        res => {
          this.produits = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  // Récupération des lunettes solaires

  // Récupération des lunetts de vue
  //Recup couleur

  //Recup max prix

  data() {
    return {
      selected: [], // Must be an array reference!
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' },
      ],
    };
  }

  public get;
}
