
package com.seonbi.api.controller;

import com.seonbi.api.model.MemberDto;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.service.MemberService;
import com.seonbi.auth.SeonbiUserDetail;
import com.seonbi.db.entity.Member;
import com.seonbi.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/member")
public class MemberController {


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberService memberService;

    //로그인 후 필요한 요청
    @GetMapping("/auth")

    public ResponseEntity<String> authorize(@ApiIgnore Authentication authentication) {

        SeonbiUserDetail details = (SeonbiUserDetail) authentication.getDetails();
        details.getUsername();

        return ResponseEntity.ok("ok");
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
    ) {

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
        if (image!=null){
//            이미지 처리
//            member.setImageId();
            System.out.println("image set");
        }
        member.setVerse(verse);

        memberService.create(member);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));


    }


    //로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member) {

        String email=member.getEmail();
        String password=member.getPassword();

        MemberDto memberDto=memberService.getMemberByEmail(email);

//        if(member1==null)
//        {
//            return ResponseEntity.status(404).body("존재하지 않는 계정");
//        }
//
//        if(passwordEncoder.matches(password,member1.getPassword()))
//        {
//            String token = JwtTokenProvider.getToken(email, "user");
//
//            return ResponseEntity.status(200).body(token);
//
//        }



        return ResponseEntity.status(404).body("비밀번호가 일치하지 않습니다");
    }

}