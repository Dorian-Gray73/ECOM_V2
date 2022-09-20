package com.org.ecomv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.org.ecomv2.domain.enumeration.Type;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "courriel")
    private String courriel;

    @Column(name = "adresse")
    private String adresse;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;

    @OneToMany(mappedBy = "utilisateur")
    @JsonIgnoreProperties(value = { "ligneTransactions", "utilisateur" }, allowSetters = true)
    private Set<Transaction> transactions = new HashSet<>();

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Utilisateur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Utilisateur nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Utilisateur prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCourriel() {
        return this.courriel;
    }

    public Utilisateur courriel(String courriel) {
        this.setCourriel(courriel);
        return this;
    }

    public void setCourriel(String courriel) {
        this.courriel = courriel;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Utilisateur adresse(String adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Type getType() {
        return this.type;
    }

    public Utilisateur type(Type type) {
        this.setType(type);
        return this;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Set<Transaction> getTransactions() {
        return this.transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        if (this.transactions != null) {
            this.transactions.forEach(i -> i.setUtilisateur(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setUtilisateur(this));
        }
        this.transactions = transactions;
    }

    public Utilisateur transactions(Set<Transaction> transactions) {
        this.setTransactions(transactions);
        return this;
    }

    public Utilisateur addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setUtilisateur(null);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Utilisateur user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Utilisateur)) {
            return false;
        }
        return id != null && id.equals(((Utilisateur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", courriel='" + getCourriel() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
