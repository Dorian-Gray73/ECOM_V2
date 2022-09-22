import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { IProduit } from '@/shared/model/produit.model';
import AlertService from '@/shared/alert/alert.service';
import ProduitService from '@/entities/produit/produit.service';
import AccountService from '@/account/account.service';
import PanierService from '@/panier/panier.service';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';

@Component
export default class Recherche extends Vue {
  // Appel Service
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('caracteristiqueService') private caracteristiqueService = () => new CaracteristiqueService();
  @Inject('alertService') private alertService: () => AlertService;

  // Data
  public produits: IProduit[] = [];
  public couleurs = [];
  public selectedCouleurs = [];
  public prixMinMax = [];
  public prixMin = 1;
  public prixMax = 1;
  public sliderMin = 1;
  public sliderMax = 1;
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
          let prixMinMax = res.data;
          prixMinMax = prixMinMax.split(',');
          this.prixMin = prixMinMax[0];
          this.prixMax = prixMinMax[1];
          this.sliderMin = this.prixMin;
          this.sliderMax = this.prixMax;
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

  // Pagination
  get produitList() {
    let produitsFiltered = this.filtreProduitSearch(this.produits);
    produitsFiltered = this.filtreProduitCouleur(produitsFiltered);
    produitsFiltered = this.filtreProduitPrix(produitsFiltered);
    this.rows = produitsFiltered.length;
    return produitsFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
  }

  public filtreProduitSearch(produitsListe) {
    return produitsListe.filter(produit => produit.nom.toLowerCase().includes(this.search.toLowerCase()));
  }

  public filtreProduitCouleur(produitsListe) {
    let produitListeFiltrer = produitsListe;
    if (this.selectedCouleurs.length != 0) {
      produitListeFiltrer = produitsListe.filter(produit => {
        let produitVerif = false;
        produit.caracteristiques.forEach(cara => {
          this.selectedCouleurs.forEach(couleur => {
            if (cara.couleur.toLowerCase().includes(couleur.toLowerCase())) {
              produitVerif = true;
            }
          });
        });
        return produitVerif;
      });
    }
    return produitListeFiltrer;
  }

  public filtreProduitPrix(produitsListe) {
    return produitsListe.filter(produit => {
      if (produit.prix > this.sliderMin && produit.prix < this.sliderMax) {
        return true;
      }
    });
  }
}
