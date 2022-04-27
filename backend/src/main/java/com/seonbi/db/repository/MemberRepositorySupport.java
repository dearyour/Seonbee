package com.seonbi.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.QMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMember qMember=QMember.member;

    @Autowired
    private PasswordEncoder passwordEncoder;

}
