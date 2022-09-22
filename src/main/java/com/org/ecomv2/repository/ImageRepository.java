package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Image;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the Image entity.
 */
@Transactional
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    /*
     * Récupération de tous les produits et de leurs images
     */
    @Query(value = "SELECT * FROM Image i JOIN Produit p on i.Produit_id = p.id", nativeQuery = true)
    public List<Image> getAllProduitsImages();

    /*
     * Récupération des produits de leurs caractéristiques et images
     */
    @Query(
        value = "SELECT * FROM Image i JOIN Produit p ON produit_id = p.id JOIN caracteristique c ON caracteristique_id = c.id WHERE p.id = :produitId",
        nativeQuery = true
    )
    public List<Image> getProduitCaracteristiqueImage(@Param("produitId") long produitId);
}
