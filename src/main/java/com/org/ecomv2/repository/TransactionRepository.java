package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Transaction;
import com.org.ecomv2.domain.enumeration.EtatProduit;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import org.hibernate.annotations.Any;
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
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Transaction SET date = :newDate WHERE id = :transactionId")
    void updateTransactionDate(@Param("transactionId") Long transactionId, @Param("newDate") LocalDate newDate);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Transaction SET date = :newDate, etat = :newEtat WHERE id = :transactionId")
    void updateTransactionDate(
        @Param("transactionId") Long transactionId,
        @Param("newDate") LocalDate newDate,
        @Param("newEtat") EtatProduit newEtat
    );

    @Query("select t from Transaction t where t.etat='Encours'")
    Transaction getTransactionEnCours();

    @Query(
        "select t, lt.caracteristique from Transaction t JOIN Utilisateur u ON t.utilisateur.id = u.id join LigneTransaction lt  on lt.transaction.id = t.id JOIN Caracteristique c on lt.caracteristique.id = c.id WHERE u.id = :idUtilisateur"
    )
    List<Transaction> getTransactionByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
}
