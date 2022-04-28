package com.seonbi.db.repository;


import com.seonbi.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {

    Image findByImageIdAndIsDeleted(Long imageId, boolean isDeleted);
}
