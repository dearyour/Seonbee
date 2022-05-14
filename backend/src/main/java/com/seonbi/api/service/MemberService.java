
package com.seonbi.api.service;

import com.seonbi.api.model.MemberDto;
import com.seonbi.api.model.MemberSearchDto;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.db.entity.Member;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

public interface MemberService {
 String kakaoToken(String code); // 프론트로부터 넘겨받은 인가코드로 카카오 access 토큰 발급
    String getKakaoUserInfo(String accessToken); // access토큰으로 카카오 사용자 정보를 가져온다
    MemberDto getMemberByNickname(String nickname);
    MemberDto getMemberByEmail(String email);
    MemberDto getMemberByMemberId(Long memberId);
//    List<MemberDto> getMemberList();
    Member createMember(Member member);
    void updateMember(Member member);
    int emailCheck(String email);
    int passwordCheck(String password);
    int nicknameCheck(String nickname);
    int loginCheck(MemberLoginReq memberLoginReq);
    int nicknameCheckExceptMe(String nickname, String curNickname);
    void deleteMember(Long memberId);
    boolean isMemberValid(Long hostId);
    List<MemberSearchDto> searchByNickname(Long memberId, String nickname);
    int updatePassword(String email, String password);
}