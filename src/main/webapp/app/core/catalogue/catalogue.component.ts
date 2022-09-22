import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import ProduitService from '@/entities/produit/produit.service';
import AlertService from '@/shared/alert/alert.service';
import { IProduit } from '@/shared/model/produit.model';

@Component
export default class Catalogue extends Vue {
  // Appel Service
  @Provide('produitService')
  private produitService = () => new ProduitService();
  @Inject('alertService')
  private alertService: () => AlertService;

  // Data
  public produits: IProduit[] = [];
  public isFetching = false;
  public rows = 0;
  public currentPage = 1;
  public perPage = 12;
  public isLoading = false;

  public mounted(): void {
    this.retrieveAllProduits();
  }

  /* public handleSyncList(): void {
    this.clear();
  }

  public clear(): void {
    this.retrieveAllProduits();
  }*/

  // Récupération de tous les produits
  public retrieveAllProduits(): void {
    this.isFetching = true;
    this.isLoading = true;
    this.produitService()
      .retrieve()
      .then(
        res => {
          this.produits = res.data;
          this.rows = this.produits.length;
          this.isFetching = false;
          this.isLoading = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  // Pagination
  get produitList() {
    return this.produits.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
  }
}
