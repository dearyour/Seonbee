package com.seonbi.db.repository;


import com.seonbi.db.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FriendRepository extends JpaRepository<Friend,Long> {

    Friend findByFollowerIdAndFolloweeIdAndIsDeleted(Long followerId, Long followeeId, boolean isDeleted);
}
