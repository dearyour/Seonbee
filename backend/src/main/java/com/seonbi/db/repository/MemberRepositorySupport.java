package com.seonbi.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seonbi.db.entity.QMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class MemberRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMember qMember=QMember.member;

    @Transactional
    public void deleteMember(Long memberId) {
        jpaQueryFactory.update(qMember)
                .where(qMember.memberId.eq(memberId))
                .set(qMember.isDeleted, true).execute();
    }
}
