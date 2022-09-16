package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Produit;
import java.util.HashMap;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Produit entity.
 */
@Repository
@Transactional
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    /**
     * Function which return the name of Produit
     * @return Une liste de Produits
     */
    @Query("select nom FROM Produit")
    List<String> getNomProduits();

    @Query("SELECT min(p.prix), max(p.prix) FROM Produit p")
    List<Object> getAllPrix();
}
