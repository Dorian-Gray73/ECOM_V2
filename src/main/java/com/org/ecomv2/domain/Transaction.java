package com.org.ecomv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.org.ecomv2.domain.enumeration.EtatProduit;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat")
    private EtatProduit etat;

    @Column(name = "date")
    private LocalDate date;

    @OneToMany(mappedBy = "transaction", fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "transaction", "caracteristique" }, allowSetters = true)
    private Set<LigneTransaction> ligneTransactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "transactions", "internal_user" }, allowSetters = true)
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Transaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EtatProduit getEtat() {
        return this.etat;
    }

    public Transaction etat(EtatProduit etat) {
        this.setEtat(etat);
        return this;
    }

    public void setEtat(EtatProduit etat) {
        this.etat = etat;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Transaction date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<LigneTransaction> getLigneTransactions() {
        return this.ligneTransactions;
    }

    public void setLigneTransactions(Set<LigneTransaction> ligneTransactions) {
        if (this.ligneTransactions != null) {
            this.ligneTransactions.forEach(i -> i.setTransaction(null));
        }
        if (ligneTransactions != null) {
            ligneTransactions.forEach(i -> i.setTransaction(this));
        }
        this.ligneTransactions = ligneTransactions;
    }

    public Transaction ligneTransactions(Set<LigneTransaction> ligneTransactions) {
        this.setLigneTransactions(ligneTransactions);
        return this;
    }

    public Transaction addLigneTransaction(LigneTransaction ligneTransaction) {
        this.ligneTransactions.add(ligneTransaction);
        ligneTransaction.setTransaction(this);
        return this;
    }

    public Transaction removeLigneTransaction(LigneTransaction ligneTransaction) {
        this.ligneTransactions.remove(ligneTransaction);
        ligneTransaction.setTransaction(null);
        return this;
    }

    public Utilisateur getUtilisateur() {
        return this.utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Transaction utilisateur(Utilisateur utilisateur) {
        this.setUtilisateur(utilisateur);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", etat='" + getEtat() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
