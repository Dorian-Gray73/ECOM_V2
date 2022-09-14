package com.org.ecomv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prix")
    private Float prix;

    @Column(name = "marque")
    private String marque;

    @Column(name = "progressif")
    private Boolean progressif;

    @OneToMany(mappedBy = "produit")
    @JsonIgnoreProperties(value = { "images", "ligneTransactions", "produit" }, allowSetters = true)
    private Set<Caracteristique> caracteristiques = new HashSet<>();

    @OneToMany(mappedBy = "produit")
    @JsonIgnoreProperties(value = { "caracteristique", "produit" }, allowSetters = true)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "produit")
    @JsonIgnoreProperties(value = { "produit" }, allowSetters = true)
    private Set<Modele> modeles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Produit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Produit nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Float getPrix() {
        return this.prix;
    }

    public Produit prix(Float prix) {
        this.setPrix(prix);
        return this;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public String getMarque() {
        return this.marque;
    }

    public Produit marque(String marque) {
        this.setMarque(marque);
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Boolean getProgressif() {
        return this.progressif;
    }

    public Produit progressif(Boolean progressif) {
        this.setProgressif(progressif);
        return this;
    }

    public void setProgressif(Boolean progressif) {
        this.progressif = progressif;
    }

    public Set<Caracteristique> getCaracteristiques() {
        return this.caracteristiques;
    }

    public void setCaracteristiques(Set<Caracteristique> caracteristiques) {
        if (this.caracteristiques != null) {
            this.caracteristiques.forEach(i -> i.setProduit(null));
        }
        if (caracteristiques != null) {
            caracteristiques.forEach(i -> i.setProduit(this));
        }
        this.caracteristiques = caracteristiques;
    }

    public Produit caracteristiques(Set<Caracteristique> caracteristiques) {
        this.setCaracteristiques(caracteristiques);
        return this;
    }

    public Produit addCaracteristique(Caracteristique caracteristique) {
        this.caracteristiques.add(caracteristique);
        caracteristique.setProduit(this);
        return this;
    }

    public Produit removeCaracteristique(Caracteristique caracteristique) {
        this.caracteristiques.remove(caracteristique);
        caracteristique.setProduit(null);
        return this;
    }

    public Set<Image> getImages() {
        return this.images;
    }

    public void setImages(Set<Image> images) {
        if (this.images != null) {
            this.images.forEach(i -> i.setProduit(null));
        }
        if (images != null) {
            images.forEach(i -> i.setProduit(this));
        }
        this.images = images;
    }

    public Produit images(Set<Image> images) {
        this.setImages(images);
        return this;
    }

    public Produit addImage(Image image) {
        this.images.add(image);
        image.setProduit(this);
        return this;
    }

    public Produit removeImage(Image image) {
        this.images.remove(image);
        image.setProduit(null);
        return this;
    }

    public Set<Modele> getModeles() {
        return this.modeles;
    }

    public void setModeles(Set<Modele> modeles) {
        if (this.modeles != null) {
            this.modeles.forEach(i -> i.setProduit(null));
        }
        if (modeles != null) {
            modeles.forEach(i -> i.setProduit(this));
        }
        this.modeles = modeles;
    }

    public Produit modeles(Set<Modele> modeles) {
        this.setModeles(modeles);
        return this;
    }

    public Produit addModele(Modele modele) {
        this.modeles.add(modele);
        modele.setProduit(this);
        return this;
    }

    public Produit removeModele(Modele modele) {
        this.modeles.remove(modele);
        modele.setProduit(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prix=" + getPrix() +
            ", marque='" + getMarque() + "'" +
            ", progressif='" + getProgressif() + "'" +
            "}";
    }
}
