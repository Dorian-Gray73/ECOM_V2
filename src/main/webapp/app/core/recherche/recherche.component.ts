import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';
import AccountService from '@/account/account.service';
import PanierService from '@/panier/panier.service';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';

@Component
export default class Recherche extends Vue {
  // Call Service
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('caracteristiqueService') private caracteristiqueService = () => new CaracteristiqueService();
  @Inject('alertService') private alertService: () => AlertService;

  // Data
  public produits: IProduit[] = [];
  public couleurs = [];
  public selectedCouleurs = [];
  public prixMinMax = [];
  public marques = [];
  public isFetching = false;
  public search = '';
  public rows = 0;
  public currentPage = 1;
  public perPage = 9;

  public mounted(): void {
    this.retrieveAllProduits();
    this.retrieveAllCouleurs();
    this.retrieveMarques();
    this.retrievePrix();
  }

  public clear(): void {
    this.retrieveAllProduits();
    this.retrieveAllCouleurs();
    this.retrieveMarques();
    this.retrievePrix();
  }

  //Récupération des produits
  public retrieveAllProduits(): void {
    this.isFetching = true;
    this.produitService()
      .retrieve()
      .then(
        res => {
          this.produits = res.data;
          console.log(this.produits);
          this.rows = this.produits.length;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  //Récupération des couleurs
  public retrieveAllCouleurs(): void {
    this.isFetching = true;
    this.caracteristiqueService()
      .retrieveCouleurs()
      .then(
        res => {
          this.couleurs = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  //Récupération des prix min et max
  public retrievePrix(): void {
    this.isFetching = true;
    this.produitService()
      .retrievePrix()
      .then(
        res => {
          this.prixMinMax = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  //Récupération des marques
  public retrieveMarques(): void {
    this.isFetching = true;
    this.produitService()
      .retrieveMarques()
      .then(
        res => {
          this.marques = res.data;
          console.log(this.marques);
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

  // Pagination
  get produitList() {
    let produitsFiltered;
    produitsFiltered = this.filtreProduitSearch(this.produits);
    return produitsFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
  }

  public filtreProduitSearch(produitsListe) {
    return this.produits.filter(produits => produits.nom.toLowerCase().includes(this.search.toLowerCase()));
  }

  public filtreProduitCouleur(produitsListe) {}

  public filtreProduitPrix(produitsListe) {}
}
