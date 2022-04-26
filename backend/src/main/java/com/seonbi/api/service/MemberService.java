
package com.seonbi.api.service;

import com.seonbi.db.entity.Member;

public interface MemberService {

    Member getMemberByMemberNickname(String nickname); //닉네임으로 entity 조회
    Member getMemberByEmail(String email); // 이메일로  entity조회
    void register(Member member);
}