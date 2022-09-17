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

    /**
     * Function which return les marques des produits
     * @return Une liste des marques
     */
    @Query(value = "SELECT DISTINCT ON (upper(p.marque)) p.marque FROM Produit p ORDER BY upper(p.marque)", nativeQuery = true) // comme ça on est case-insensitive (i.e. 'a' = 'A')
    List<String> getAllMarques();

    @Query("SELECT min(p.prix), max(p.prix) FROM Produit p")
    List<Object> getAllPrix();
}
