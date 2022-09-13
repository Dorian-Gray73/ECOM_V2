package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Produit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the Produit entity.
 */
//@SuppressWarnings("unused")
@Repository
@Transactional
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    @Query("SELECT nom FROM Produit p WHERE p.marque='Ray-ban'")
    String GetRayban();
}
