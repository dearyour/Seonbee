
package com.seonbi.api.controller;

import com.seonbi.api.model.MemberDto;
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

//        SeonbiUserDetail details = (SeonbiUserDetail) authentication.getDetails();
//        details.getUsername();

        return ResponseEntity.ok("ok");
    }


    //회원가입
    @PostMapping()
    public ResponseEntity<String> create(
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
//        member.setImageId();
        memberService.create(member);

        System.out.println("----------------------------------");
        return ResponseEntity.ok("ok");


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