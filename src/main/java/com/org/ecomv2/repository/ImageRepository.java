package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Image;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data JPA repository for the Image entity.
 */
@Transactional
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "SELECT * FROM Image i JOIN Produit p on i.Produit_id = p.id", nativeQuery = true)
    public List<Image> getAllProduitsImages();
}
