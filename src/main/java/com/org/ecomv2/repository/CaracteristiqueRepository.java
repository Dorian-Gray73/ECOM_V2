package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Caracteristique;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the Caracteristique entity.
 */

@Transactional
@Repository
public interface CaracteristiqueRepository extends JpaRepository<Caracteristique, Long> {
    @Query("SELECT DISTINCT(c.couleur) FROM Caracteristique c")
    List<String> getAllCouleurs();
}
