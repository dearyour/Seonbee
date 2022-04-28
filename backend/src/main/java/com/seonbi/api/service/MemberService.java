
package com.seonbi.api.service;

import com.seonbi.db.entity.Member;

import java.util.HashMap;
import java.util.Map;

public interface MemberService {

    Member getMemberByMemberNickname(String nickname); //닉네임으로 entity 조회
    Member getMemberByEmail(String email); // 이메일로  entity조회
    void register(Member member);
    String kakaoToken(String code); // 프론트로부터 넘겨받은 인가코드로 토큰 발급
    Map<String,String> getKakaoUserInfo(String accessToken); // access토큰으로 카카오 사용자 정보를 가져온다
}