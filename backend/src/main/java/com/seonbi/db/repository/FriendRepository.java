package com.seonbi.db.repository;


import com.seonbi.db.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FriendRepository extends JpaRepository<Friend,Long> {

    Friend findByFollowerIdAndFolloweeIdAndIsDeleted(Long followerId, Long followeeId, boolean isDeleted);
    Friend findByFollowerIdAndFolloweeIdAndIsAllowedAndIsDeleted(Long followerId, Long followeeId, String isAllowed, boolean isDeleted);
    List<Friend> findAllByFolloweeIdAndIsAllowedAndIsDeleted(Long followeeId, String isAllowed, boolean isDeleted);
    List<Friend> findAllByFollowerIdAndIsAllowedAndIsDeleted(Long followerId, String isAllowed, boolean isDeleted);
}
