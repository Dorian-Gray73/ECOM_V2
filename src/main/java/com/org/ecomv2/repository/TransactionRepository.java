package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Transaction;
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
    @Query(
        value = "SELECT * FROM Transaction t JOIN Utilisateur u on t.Utilisateur_id = u.id WHERE t.etat = 'Encours' AND u.id = :utilisateurId",
        nativeQuery = true
    )
    List<Transaction> getTransactionByUser(@Param("utilisateurId") Long utilisateurId);
}
