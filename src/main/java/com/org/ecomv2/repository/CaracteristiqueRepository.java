package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Caracteristique;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the Caracteristique entity.
 */

@Transactional
@Repository
public interface CaracteristiqueRepository extends JpaRepository<Caracteristique, Long> {
    /*
     * Récupération des caractéristiques par l'id produit
     */
    @Query(value = "SELECT * FROM Caracteristique c JOIN Produit p ON c.produit_id = p.id WHERE p.id = :produitId", nativeQuery = true)
    List<Caracteristique> getCaracteristiquesBy(@Param("produitId") long produitId);

    /*
     * Récupération de toutes les couleurs
     */
    @Query("SELECT DISTINCT(c.couleur) FROM Caracteristique c")
    List<String> getAllCouleurs();

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Caracteristique SET quantite = quantite-:quantite WHERE id = :idCaracteristique")
    void updateCaracteristiqueQuantite(@Param("idCaracteristique") Long idCaracteristique, @Param("quantite") Long quantite);
}
