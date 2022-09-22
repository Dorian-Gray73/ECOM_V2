package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Transaction;
import com.org.ecomv2.domain.enumeration.EtatProduit;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the Transaction entity.
 */
@Transactional
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    /*
     * Mise à jour de la date d'une transaction
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Transaction SET date = :newDate WHERE id = :transactionId")
    void updateTransactionDate(@Param("transactionId") Long transactionId, @Param("newDate") LocalDate newDate);

    /*
     * Mise à jour de la date et de l'état d'une transaction
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Transaction SET date = :newDate, etat = :newEtat WHERE id = :transactionId")
    void updateTransactionDate(
        @Param("transactionId") Long transactionId,
        @Param("newDate") LocalDate newDate,
        @Param("newEtat") EtatProduit newEtat
    );

    /*
     * Récupération de la transaction en cours
     */
    @Query("select t from Transaction t where t.etat='Encours'")
    Transaction getTransactionEnCours();

    /*
     * Récupération des transactions d'un utilisateur
     */
    @Query(
        "select t, lt.caracteristique from Transaction t JOIN Utilisateur u ON t.utilisateur.id = u.id join LigneTransaction lt  on lt.transaction.id = t.id JOIN Caracteristique c on lt.caracteristique.id = c.id WHERE u.id = :idUtilisateur"
    )
    List<Transaction> getTransactionsByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
}
