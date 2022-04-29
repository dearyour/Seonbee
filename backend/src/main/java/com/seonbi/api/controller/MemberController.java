
package com.seonbi.api.controller;

import com.seonbi.api.model.MemberAuthDto;
import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.MemberCreateReq;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.MemberAuthRes;
import com.seonbi.api.response.MemberGetRes;
import com.seonbi.api.response.MemberLoginRes;
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
@RequestMapping("/api/member")
public class MemberController {


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberService memberService;

    @Autowired
    ImageService imageService;

    @Autowired
    MemberAuthService memberAuthService;



    // 카카오 로그인 요청
    @GetMapping("/kakao")
        public ResponseEntity<? extends BaseResponseBody> kakao(@RequestParam String code) //카카오 로그인 요청
        {
            System.out.println("프론트로부터 넘겨받은 인가코드"+code);
            String accessToken=memberService.kakaoToken(code); //카카오 access 토큰 발급
            //발급받은 토큰으로 사용자 정보 조회 , 서비스 회원 정보 확인 또는 가입 처리
            String token=memberService.getKakaoUserInfo(accessToken);





            return ResponseEntity.status(200).body(MemberLoginRes.of(200, "Success", token));
        }


    //로그인 후 필요한 요청
    @GetMapping("/auth")
    public ResponseEntity<? extends BaseResponseBody> authorize(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));
        }
        MemberAuthDto memberAuthDto=new MemberAuthDto(member.getMemberId(), member.getNickname(), member.getImageId());

        return ResponseEntity.status(200).body(MemberAuthRes.of(200, "Success", memberAuthDto));
    }

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createMember(MemberCreateReq memberCreateReq){
        // 이메일 유효성 검사

        String email=memberCreateReq.getEmail();
        String nickname=memberCreateReq.getNickname();
        String password=memberCreateReq.getPassword();

        int emailCode=memberService.emailCheck(email);
        if (emailCode == 401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"올바른 이메일 형식으로 입력해주세요."));
        else if (emailCode == 402)
            return ResponseEntity.status(402).body(BaseResponseBody.of(402,"이메일이 중복됩니다. 다른 이메일로 가입해주세요."));

        // 닉네임 중복 검사
        int nicknameCode=memberService.nicknameCheck(nickname);
        if (nicknameCode==401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"2자 이상 12자 미만으로 입력해주세요."));
        if (nicknameCode==402)
            return ResponseEntity.status(402).body(BaseResponseBody.of(402,"닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));


        // 비밀번호 유효성 검사
        int passwordCode=memberService.passwordCheck(password);
        if(passwordCode == 401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"비밀번호는 영문, 숫자 포함 8~16자로 입력해주세요."));

        Member member=new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        member.setNickname(nickname);
        member.setGender(memberCreateReq.getGender());
        member.setBirthday(memberCreateReq.getBirthday());
        member.setMbti(memberCreateReq.getMbti());
        member.setInterest(memberCreateReq.getInterest());
        member.setLikelist(memberCreateReq.getLikelist());
        member.setBanlist(memberCreateReq.getBanlist());
        member.setVerse(memberCreateReq.getVerse());
        member.setJob(memberCreateReq.getJob());
        memberService.createMember(member);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/update")
    public ResponseEntity<? extends BaseResponseBody> updateMember(
            @ApiIgnore Authentication authentication,
            @RequestParam("memberId") Long memberId,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname,
            @RequestParam(required = false, value="gender") String gender,
            @RequestParam(required = false, value="birthday") String birthday,
            @RequestParam(required = false, value="mbti") String mbti,
            @RequestParam(required = false, value="interest") String interest,
            @RequestParam(required = false, value="likelist") String likelist,
            @RequestParam(required = false, value="banlist") String banlist,
            @RequestParam(required = false, value="verse") String verse,
            @RequestParam(required = false, value="job") String job,
            @RequestParam(required = false, value="image") MultipartFile image
    ) throws IOException {

        Member curMember=memberAuthService.memberAuthorize(authentication);
        if (curMember==null || !curMember.getMemberId().equals(memberId)){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));
        }
        // 닉네임 중복 검사
        int nicknameCode=memberService.nicknameCheckExceptMe(nickname, curMember.getNickname());
        if (nicknameCode==401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"2자 이상 12자 미만으로 입력해주세요."));
        if (nicknameCode==402)
            return ResponseEntity.status(402).body(BaseResponseBody.of(402,"닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));


        // 비밀번호 유효성 검사
        int passwordCode=memberService.passwordCheck(password);
        if(passwordCode == 401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"비밀번호를 입력해주세요."));
        else if(passwordCode == 402)
            return ResponseEntity.status(402).body(BaseResponseBody.of(402,"비밀번호는 영문, 숫자 포함 8~16자로 입력해주세요."));

        Member member=new Member();
        member.setMemberId(memberId);
        member.setEmail(curMember.getEmail());
        member.setPassword(passwordEncoder.encode(password));
        member.setNickname(nickname);
        member.setGender(gender);
        member.setBirthday(birthday);
        member.setMbti(mbti);
        member.setInterest(interest);
        member.setLikelist(likelist);
        member.setBanlist(banlist);
        member.setVerse(verse);
        member.setJob(job);

        Long imageId=imageService.saveImage(image);
        member.setImageId(imageId);

        memberService.updateMember(member);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

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

    @PostMapping("/login")
    public ResponseEntity<? extends BaseResponseBody> login(@RequestBody MemberLoginReq memberLoginReq) {

        int loginCode=memberService.loginCheck(memberLoginReq);
        if (loginCode==401){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "존재하지 않는 계정입니다."));
        } else if (loginCode==402) {
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "비밀번호가 일치하지 않습니다."));
        }

        String token = JwtTokenProvider.getToken(memberLoginReq.getEmail());
        return ResponseEntity.status(200).body(MemberLoginRes.of(200, "Success", token));

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

    @GetMapping("update/check/{nickname}")
    public ResponseEntity<? extends BaseResponseBody> updateNicknameCheck(
            @ApiIgnore Authentication authentication, @PathVariable("nickname") String nickname) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));
        }
        int nicknameCode=memberService.nicknameCheckExceptMe(nickname, member.getNickname());
        if (nicknameCode==401){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "2자 이상 12자 미만으로 입력해주세요."));
        } else if (nicknameCode==402){
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용가능한 닉네임입니다."));
    }

    @GetMapping("/image/{imageId}")
    public ResponseEntity<String> getImage(@PathVariable("imageId") Long imageId){
        byte[] imageByteArray=imageService.getImage(imageId);
        String imageString = new String(Base64.encodeBase64(imageByteArray));
        return new ResponseEntity<String>(imageString, HttpStatus.OK);
    }

//    @PostMapping("/image/test")
//    public ResponseEntity<? extends BaseResponseBody> imageUploadTest(
//            @RequestParam("name") String name,
//            @RequestParam(required = false, value="gender") String gender,
//            @RequestParam(required = false, value="image") MultipartFile image
//    ) throws IOException {
//
//        System.out.println(name+" "+gender);
//        Long imageId=imageService.saveImage(image);
//        System.out.println("imageId: "+imageId);
//
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }
}