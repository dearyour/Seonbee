
package com.seonbi.api.controller;

import com.seonbi.api.model.MemberAuthDto;
import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.MemberCreateReq;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.MemberAuthRes;
import com.seonbi.api.response.MemberGetRes;
import com.seonbi.api.response.MemberLoginRes;
import com.seonbi.api.service.FriendService;
import com.seonbi.api.service.ImageService;
import com.seonbi.api.service.MemberAuthService;
import com.seonbi.api.service.MemberService;
import com.seonbi.db.entity.Member;
import com.seonbi.util.JwtTokenProvider;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@RestController
@RequestMapping("/api/friend")
public class FriendController {

    @Autowired
    MemberService memberService;

    @Autowired
    ImageService imageService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    FriendService friendService;


    @GetMapping("/delete/{memberId}")
    public ResponseEntity<? extends BaseResponseBody> deleteMember(
            @PathVariable("memberId") Long memberId,
            @ApiIgnore Authentication authentication
    ){
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null || !member.getMemberId().equals(memberId)){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));
        }

        memberService.deleteMember(memberId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("{memberId}")
    public ResponseEntity<? extends BaseResponseBody> getMemberByMemberId(@PathVariable("memberId") Long memberId) {
        MemberDto memberDto=memberService.getMemberByMemberId(memberId);
        if (memberDto==null){
            return ResponseEntity.status(401).body(MemberGetRes.of(401, "존재하지 않는 회원입니다.", null));
        }
        return ResponseEntity.status(200).body(MemberGetRes.of(200, "Success", memberDto));
    }

    @GetMapping("check/{nickname}")
    public ResponseEntity<? extends BaseResponseBody> nicknameCheck(@PathVariable("nickname") String nickname) {
        int nicknameCode=memberService.nicknameCheck(nickname);
        if (nicknameCode==401){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "2자 이상 12자 미만으로 입력해주세요."));
        } else if (nicknameCode==402){
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용가능한 닉네임입니다."));
    }

}