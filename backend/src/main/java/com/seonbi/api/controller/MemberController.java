
package com.seonbi.api.controller;

import com.seonbi.api.model.MemberAuthDto;
import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.MemberAuthRes;
import com.seonbi.api.response.MemberGetRes;
import com.seonbi.api.response.MemberLoginRes;
import com.seonbi.api.service.ImageService;
import com.seonbi.api.service.MemberService;
import com.seonbi.auth.SeonbiUserDetail;
import com.seonbi.db.entity.Member;
import com.seonbi.util.JwtTokenProvider;
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
@RequestMapping("/api/member")
public class MemberController {


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberService memberService;

    @Autowired
    ImageService imageService;

    //로그인 후 필요한 요청
    @GetMapping("/auth")

    public ResponseEntity<? extends BaseResponseBody> authorize(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        SeonbiUserDetail details = (SeonbiUserDetail) authentication.getDetails();
        Member member=details.getMember();
        MemberAuthDto memberAuthDto=new MemberAuthDto(member.getMemberId(), member.getNickname(), member.getImageId());

        return ResponseEntity.status(200).body(MemberAuthRes.of(200, "Success", memberAuthDto));
    }


    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> create(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname,
            @RequestParam(required = false, value="gender") String gender,
            @RequestParam(required = false, value="birthday") String birthday,
            @RequestParam(required = false, value="mbti") String mbti,
            @RequestParam(required = false, value="interest") String interest,
            @RequestParam(required = false, value="likelist") String likelist,
            @RequestParam(required = false, value="banlist") String banlist,
            @RequestParam(required = false, value="verse") String verse,
            @RequestParam(required = false, value="image") MultipartFile image
    ) throws IOException {

        // 이메일 유효성 검사
        int emailCode=memberService.emailCheck(email);
        if (emailCode == 401)
            return ResponseEntity.status(200).body(BaseResponseBody.of(401,"이메일을 입력해주세요"));
        else if (emailCode == 402)
            return ResponseEntity.status(200).body(BaseResponseBody.of(402,"올바른 이메일 형식으로 입력해주세요."));
        else if (emailCode == 403)
            return ResponseEntity.status(200).body(BaseResponseBody.of(403,"이메일이 중복됩니다. 다른 이메일로 가입해주세요."));

        // 닉네임 중복 검사
        if (memberService.nicknameCheck(nickname)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(403,"닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));
        }

        // 비밀번호 유효성 검사
        int passwordCode=memberService.passwordCheck(password);
        if(passwordCode == 401)
            return ResponseEntity.status(200).body(BaseResponseBody.of(401,"비밀번호를 입력해주세요"));
        else if(passwordCode == 402)
            return ResponseEntity.status(200).body(BaseResponseBody.of(402,"비밀번호는 영문, 숫자 포함 8~16자로 입력해주세요."));


        Member member=new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        member.setNickname(nickname);
        member.setGender(gender);
        member.setBirthday(birthday);
        member.setMbti(mbti);
        member.setInterest(interest);
        member.setLikelist(likelist);
        member.setBanlist(banlist);

        Long imageId= imageService.saveImage(image);
        member.setImageId(imageId);
        System.out.println("imageId: "+imageId);

        member.setVerse(verse);

        memberService.create(member);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));


    }


    //로그인
    @PostMapping("/login")
    public ResponseEntity<? extends BaseResponseBody> login(@RequestBody MemberLoginReq memberLoginReq) {

        int loginCode=memberService.loginCheck(memberLoginReq);
        if (loginCode==401){
            return ResponseEntity.status(200).body(BaseResponseBody.of(401, "존재하지 않는 계정입니다."));
        } else if (loginCode==402) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(402, "비밀번호가 일치하지 않습니다."));
        }

        String token = JwtTokenProvider.getToken(memberLoginReq.getEmail());
        return ResponseEntity.status(200).body(MemberLoginRes.of(200, "Success", token));

    }

    @GetMapping("{memberId}")
    public ResponseEntity<? extends BaseResponseBody> getMemberByMemberId(@PathVariable("memberId") Long memberId) {
        MemberDto memberDto=memberService.getMemberByMemberId(memberId);
        if (memberDto==null){
            return ResponseEntity.status(200).body(MemberGetRes.of(401, "존재하지 않는 회원입니다.", null));
        }
        return ResponseEntity.status(200).body(MemberGetRes.of(200, "Success", memberDto));
    }

//    @GetMapping("check/{nickname}")
//    public ResponseEntity<? extends BaseResponseBody> nicknameCheck(@ApiIgnore Authentication authentication, @PathVariable("nickname") String nickname) {
//        SeonbiUserDetail details = (SeonbiUserDetail) authentication.getDetails();
//        MemberDto memberDto=memberService.getMemberByMemberId(memberId);
//        if (memberDto==null){
//            return ResponseEntity.status(200).body(MemberGetRes.of(401, "존재하지 않는 회원입니다.", null));
//        }
//        return ResponseEntity.status(200).body(MemberGetRes.of(200, "Success", memberDto));
//    }

    @GetMapping("/image/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable("imageId") Long imageId){
        byte[] imageByteArray=imageService.getImage(imageId);
        return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
    }
}