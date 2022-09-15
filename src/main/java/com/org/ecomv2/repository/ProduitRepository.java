package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Produit;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Produit entity.
 */
@Transactional
@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    /**
     * Function which return the name of Produit
     * @return Une liste de Produits
     */
    @Query("SELECT nom from produit")
    List<Produit> getNomProduits();
}
