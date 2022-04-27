
package com.seonbi.api.service;

import com.seonbi.api.model.MemberDto;
import com.seonbi.db.entity.Member;

import java.util.List;

public interface MemberService {

    MemberDto getMemberByNickname(String nickname);
    MemberDto getMemberByEmail(String email);
    MemberDto getMemberByMemberId(Long memberId);
    List<MemberDto> getMemberList();
    Member create(Member member);
//    MemberDto memberEntityToDto(Member member);
    Member update(Member member);

}