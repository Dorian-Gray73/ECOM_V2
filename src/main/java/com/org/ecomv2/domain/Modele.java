package com.org.ecomv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Modele.
 */
@Entity
@Table(name = "modele")
public class Modele implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "modele")
    private String modele;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    @JsonIgnoreProperties(value = { "caracteristiques", "images", "modeles" }, allowSetters = true)
    private Produit produit;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Modele id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModele() {
        return this.modele;
    }

    public Modele modele(String modele) {
        this.setModele(modele);
        return this;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public Produit getProduit() {
        return this.produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Modele produit(Produit produit) {
        this.setProduit(produit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Modele)) {
            return false;
        }
        return id != null && id.equals(((Modele) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Modele{" +
            "id=" + getId() +
            ", modele='" + getModele() + "'" +
            "}";
    }
}
