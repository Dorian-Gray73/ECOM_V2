package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Caracteristique;
import com.org.ecomv2.domain.Image;
import com.org.ecomv2.domain.Produit;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import javax.persistence.Tuple;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
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
     * Function which return d'un produitId, on retrouve un produit avec ses cara et dans chaque cara ses images
     * @return Une liste de produit avec ses cara et dans chaque cara ses images
     */
    @Query(
        value = "SELECT p.id, p.nom, p.prix, p.marque, p.progressif, c.couleur, c.quantite, i.lien_image FROM produit p JOIN caracteristique c ON c.produit_id = p.id  JOIN image i on i.caracteristique_id = c.id WHERE p.id = :produitId",
        nativeQuery = true
    )
    List<String> getProduitCaracteristiquesImages(@Param("produitId") Long produitId);
}
