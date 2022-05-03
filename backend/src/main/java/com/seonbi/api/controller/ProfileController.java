
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberService memberService;

    @Autowired
    ImageService imageService;

    @Autowired
    MemberAuthService memberAuthService;

    @PostMapping("/update")
    public ResponseEntity<? extends BaseResponseBody> updateMember(
            @ApiIgnore Authentication authentication,
            @RequestParam("memberId") Long memberId,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname,
            @RequestParam(required = false, value = "gender") String gender,
            @RequestParam(required = false, value = "birthday") String birthday,
            @RequestParam(required = false, value = "mbti") String mbti,
            @RequestParam(required = false, value = "interest") String interest,
            @RequestParam(required = false, value = "likelist") String likelist,
            @RequestParam(required = false, value = "banlist") String banlist,
            @RequestParam(required = false, value = "verse") String verse,
            @RequestParam(required = false, value = "job") String job,
            @RequestParam(required = false, value = "image") MultipartFile image) throws IOException {

        Member curMember = memberAuthService.memberAuthorize(authentication);
        if (curMember == null || !curMember.getMemberId().equals(memberId)) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }
        // 닉네임 중복 검사
        int nicknameCode = memberService.nicknameCheckExceptMe(nickname, curMember.getNickname());
        if (nicknameCode == 401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "2자 이상 12자 미만으로 입력해주세요."));
        if (nicknameCode == 402)
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));

        // 비밀번호 유효성 검사
        int passwordCode = memberService.passwordCheck(password);
        if (passwordCode == 401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "비밀번호를 입력해주세요."));
        else if (passwordCode == 402)
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "비밀번호는 영문, 숫자 포함 8~16자로 입력해주세요."));

        Member member = new Member();
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

        Long imageId = imageService.saveImage(image);
        member.setImageId(imageId);

        memberService.updateMember(member);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

    @GetMapping("/{memberId}")
    public ResponseEntity<? extends BaseResponseBody> getMemberByMemberId(@PathVariable("memberId") Long memberId) {
        MemberDto memberDto = memberService.getMemberByMemberId(memberId);
        if (memberDto == null) {
            return ResponseEntity.status(401).body(MemberGetRes.of(401, "존재하지 않는 회원입니다.", null));
        }
        return ResponseEntity.status(200).body(MemberGetRes.of(200, "Success", memberDto));
    }

    @GetMapping("/check/{nickname}")
    public ResponseEntity<? extends BaseResponseBody> updateNicknameCheck(
            @ApiIgnore Authentication authentication, @PathVariable("nickname") String nickname) {
        Member member = memberAuthService.memberAuthorize(authentication);
        if (member == null) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }
        int nicknameCode = memberService.nicknameCheckExceptMe(nickname, member.getNickname());
        if (nicknameCode == 401) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "2자 이상 12자 미만으로 입력해주세요."));
        } else if (nicknameCode == 402) {
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "닉네임이 중복됩니다. 다른 닉네임으로 가입해주세요."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용가능한 닉네임입니다."));
    }

    @GetMapping("/delete/{memberId}")
    public ResponseEntity<? extends BaseResponseBody> deleteMember(
            @PathVariable("memberId") Long memberId,
            @ApiIgnore Authentication authentication) {
        Member member = memberAuthService.memberAuthorize(authentication);
        if (member == null || !member.getMemberId().equals(memberId)) {     // 사용자가 본인이 아니면
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        memberService.deleteMember(memberId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}