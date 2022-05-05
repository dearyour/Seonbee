package com.seonbi.db.repository;


import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecommendRepository extends JpaRepository<Recommend,Long> {

    List<Recommend> findAllByMemberIdAndIsDeleted(Long memberId, boolean isDeleted);

}
