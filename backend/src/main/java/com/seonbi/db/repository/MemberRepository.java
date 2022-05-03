package com.seonbi.db.repository;


import com.seonbi.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Member findByEmailAndIsDeletedAndIsKakao(String email, boolean isDeleted,boolean isKakao);
    Member findByEmailAndIsDeleted(String email, boolean isDeleted);
    Member findByNicknameAndIsDeleted(String nickname, boolean isDeleted);   // member table에서 nickname이라는 컬럼에 맞는 애를 return 해줌
    Member findByNicknameAndMemberIdAndIsDeleted(String nickname, Long memberId, boolean isDeleted);
    boolean existsByNicknameAndIsDeleted(String nickname, boolean isDeleted);
    Member findByMemberIdAndIsDeleted(Long memberId, boolean isDeleted);
    boolean existsByMemberIdAndIsDeleted(Long memberId, boolean isDeleted);
    List<Member> findAllByNicknameContainsAndIsDeleted(String nickname, boolean isDeleted);
}
