package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Caracteristique;
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
    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    @Query(value = "SELECT * FROM Caracteristique c JOIN Produit p ON c.produit_id = p.id WHERE p.id = :produitId", nativeQuery = true)
    List<Caracteristique> getCaracteristiquesBy(@Param("produitId") long produitId);

    @Query("SELECT DISTINCT(c.couleur) FROM Caracteristique c")
    List<String> getAllCouleurs();
}
