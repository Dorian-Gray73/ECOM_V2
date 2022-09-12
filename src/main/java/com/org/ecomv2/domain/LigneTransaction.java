package com.org.ecomv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A LigneTransaction.
 */
@Entity
@Table(name = "ligne_transaction")
public class LigneTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "quantite")
    private Integer quantite;

    @Column(name = "prix_unitaire")
    private Float prixUnitaire;

    @ManyToOne
    @JsonIgnoreProperties(value = { "ligneTransactions", "utilisateur" }, allowSetters = true)
    private Transaction transaction;

    @OneToMany(mappedBy = "ligneTransaction")
    @JsonIgnoreProperties(value = { "images", "ligneTransaction", "produit" }, allowSetters = true)
    private Set<Caracteristique> caracteristiques = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LigneTransaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return this.quantite;
    }

    public LigneTransaction quantite(Integer quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Float getPrixUnitaire() {
        return this.prixUnitaire;
    }

    public LigneTransaction prixUnitaire(Float prixUnitaire) {
        this.setPrixUnitaire(prixUnitaire);
        return this;
    }

    public void setPrixUnitaire(Float prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Transaction getTransaction() {
        return this.transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public LigneTransaction transaction(Transaction transaction) {
        this.setTransaction(transaction);
        return this;
    }

    public Set<Caracteristique> getCaracteristiques() {
        return this.caracteristiques;
    }

    public void setCaracteristiques(Set<Caracteristique> caracteristiques) {
        if (this.caracteristiques != null) {
            this.caracteristiques.forEach(i -> i.setLigneTransaction(null));
        }
        if (caracteristiques != null) {
            caracteristiques.forEach(i -> i.setLigneTransaction(this));
        }
        this.caracteristiques = caracteristiques;
    }

    public LigneTransaction caracteristiques(Set<Caracteristique> caracteristiques) {
        this.setCaracteristiques(caracteristiques);
        return this;
    }

    public LigneTransaction addCaracteristique(Caracteristique caracteristique) {
        this.caracteristiques.add(caracteristique);
        caracteristique.setLigneTransaction(this);
        return this;
    }

    public LigneTransaction removeCaracteristique(Caracteristique caracteristique) {
        this.caracteristiques.remove(caracteristique);
        caracteristique.setLigneTransaction(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneTransaction)) {
            return false;
        }
        return id != null && id.equals(((LigneTransaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneTransaction{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prixUnitaire=" + getPrixUnitaire() +
            "}";
    }
}
