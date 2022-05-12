package com.seonbi.api.controller;

import com.seonbi.api.request.EmailCodePassReq;
import com.seonbi.api.request.EmailCodeReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.service.EmailService;
import com.seonbi.api.service.MemberAuthService;
import com.seonbi.api.service.MemberService;
import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    EmailService emailService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;
    
    @PostMapping("/send")
    public ResponseEntity<? extends BaseResponseBody> createEmailSend(@RequestBody String email) throws Exception {
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member!=null)    return ResponseEntity.status(401).body(BaseResponseBody.of(401, "이미 존재하는 계정입니다."));

        emailService.sendMessage(email, "회원가입", "CREATE");
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/check")
    public ResponseEntity<? extends BaseResponseBody> createCheckCode(@RequestBody EmailCodeReq emailCodeReq) {
        int verifyCode=emailService.confirmCode(emailCodeReq.getEmail(), emailCodeReq.getCode(), "CREATE");
        if (verifyCode==402)    return ResponseEntity.status(402).body(BaseResponseBody.of(402, "인증번호가 불일치합니다."));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/findpass")
    public ResponseEntity<? extends BaseResponseBody> findpassEmailSend(@RequestBody String email) throws Exception {
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "존재하지 않은 이메일입니다."));

        emailService.sendMessage(email, "비밀번호 찾기", "FINDPASS");
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


    @PostMapping("/passcheck")
    public ResponseEntity<? extends BaseResponseBody> findpassCheckCode(@RequestBody EmailCodeReq emailCodeReq) {
        int verifyCode=emailService.confirmCode(emailCodeReq.getEmail(), emailCodeReq.getCode(), "FINDPASS");
        if (verifyCode==402)     return ResponseEntity.status(402).body(BaseResponseBody.of(402, "인증번호가 불일치합니다."));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/newpass")
    public ResponseEntity<? extends BaseResponseBody> newPasswordCode(@RequestBody EmailCodePassReq emailCodePassReq) {
        int verifyCode=emailService.confirmCode(emailCodePassReq.getEmail(), emailCodePassReq.getCode(), "FINDPASS");
        if (verifyCode==402)     return ResponseEntity.status(402).body(BaseResponseBody.of(402, "인증번호가 불일치합니다."));
        int updatePasswordCode=memberService.updatePassword(emailCodePassReq.getEmail(), emailCodePassReq.getPassword());
        if (updatePasswordCode==401)     return ResponseEntity.status(401).body(BaseResponseBody.of(401, "존재하지 않는 계정입니다."));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}