package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Produit;
import java.util.List;
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
     *
     * @return Une liste de Produits
     */
    @Query("select nom FROM Produit")
    List<String> getNomProduits();

    /**
     * Function which return d'un produitId, on retrouve un produit avec ses cara et dans chaque cara ses images
     *
     * @return Une liste de produit avec ses cara et dans chaque cara ses images
     */
    @Query(
        value = "SELECT p.id, p.nom, p.prix, p.marque, p.progressif, c.couleur, c.quantite, i.lien_image FROM produit p JOIN caracteristique c ON c.produit_id = p.id  JOIN image i on i.caracteristique_id = c.id WHERE p.id = :produitId",
        nativeQuery = true
    )
    List<Produit> getProduitCaracteristiquesImages(@Param("produitId") Long produitId);

    /**
     * Function which returns tous les produits, on récupère toutes les images pour chaque produit
     *
     * @return Une liste de produit avec les images pour chaque produit
     */
    @Query(
        value = "SELECT p.id ,p.nom nom, p.prix prix , p.marque marque , p.progressif progressif, p.images FROM produit p JOIN image i on i.produit_id = p.id group by (p.id,p.nom, p.prix, p.marque, p.progressif,p.images)",
        nativeQuery = true
    )
    List<Produit> produitsImages();

    /*
     * Function which return les marques des produits
     * @return Une liste des marques
     */
    @Query(value = "SELECT DISTINCT ON (upper(p.marque)) p.marque FROM Produit p ORDER BY upper(p.marque)", nativeQuery = true)
    // comme ça on est case-insensitive (i.e. 'a' = 'A')
    List<String> getAllMarques();

    /*
     * Récupération du prix maximum et minimum des lunettes
     */
    @Query("SELECT min(p.prix), max(p.prix) FROM Produit p")
    String getAllPrix();
}
