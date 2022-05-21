package com.seonbi.db.repository;


import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecommendRepository extends JpaRepository<Recommend,Long> {

    List<Recommend> findAllByMemberIdAndIsSavedAndIsDeleted(
            Long memberId, boolean isSaved, boolean isDeleted);
    List<Recommend> findAllByMemberIdAndReceiverIdAndIsSavedAndIsFriendAndIsDeleted(
            Long memberId, Long receiverId, boolean isSaved, boolean isMember, boolean isDeleted);
    Recommend findByRecommendIdAndIsDeleted(Long recommendId, boolean isDeleted);
    Boolean existsRecommendByProductIdAndMemberIdAndReceiverIdAndIsDeleted(Long productId, Long memberId, Long receiverId, boolean isDeleted);
    Recommend findByProductIdAndMemberIdAndReceiverIdAndIsDeleted(Long productId, Long memberId, Long receiverId, boolean isDeleted);
    List<Recommend> findAllByMemberIdAndIsDeleted(Long memberId, boolean isDeleted);
}
