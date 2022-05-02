package com.seonbi.db.repository;


import com.seonbi.db.entity.Lantern;
import com.seonbi.db.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LanternRepository extends JpaRepository<Lantern,Long> {

    Lantern findByLanternIdAndIsDeleted(Long lanternId, boolean isDeleted);
}
