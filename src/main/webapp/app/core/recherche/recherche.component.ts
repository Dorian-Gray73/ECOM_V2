import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';

@Component
export default class Recherche extends Vue {
  // Call Service
  @Provide('produitService') private produitService = () => new ProduitService();
  @Inject('alertService') private alertService: () => AlertService;

  // Data
  public produits: IProduit[] = [];
  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProduits();
  }

  public clear(): void {
    this.retrieveAllProduits();
  }

  public retrieveAllProduits(): void {
    this.isFetching = true;
    this.produitService()
      .retrieve()
      .then(
        res => {
          this.produits = res.data;
          this.isFetching = false;
          console.log(this.produits);
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

  data() {
    return {
      selected: [], // Must be an array reference!
      rows: 100,
      currentPage: 1,
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
