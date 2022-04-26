package com.seonbi.db.repository;


import com.seonbi.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {

    Member findByNickname(String nickname);
    Member findByEmail(String email);

}