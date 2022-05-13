package com.seonbi.db.repository;


import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecommendRepository extends JpaRepository<Recommend,Long> {

    List<Recommend> findAllByMemberIdAndIsSavedAndIsDeleted(
            Long memberId, boolean isSaved, boolean isDeleted);
    List<Recommend> findAllByMemberIdAndReceiverIdAndIsSavedAndIsFriendAndIsDeleted(
            Long memberId, Long receiverId, boolean isSaved, boolean isMember, boolean isDeleted);

}
