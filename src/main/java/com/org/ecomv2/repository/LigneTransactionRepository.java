package com.org.ecomv2.repository;

import com.org.ecomv2.domain.LigneTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the LigneTransaction entity.
 */
@Transactional
@Repository
public interface LigneTransactionRepository extends JpaRepository<LigneTransaction, Long> {
    /*
     * Modifier la quantite d'une ligne de transaction
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE LigneTransaction SET quantite = :newQuantite WHERE id = :ligneTransactionId")
    void updateLigneTransactionQuantite(@Param("ligneTransactionId") Long ligneTransactionId, @Param("newQuantite") Integer newQuantite);
}
