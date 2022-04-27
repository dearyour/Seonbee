package com.seonbi.api.service;


import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.MemberRepositorySupport;
import com.seonbi.util.JwtTokenProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public MemberDto getMemberByNickname(String nickname) {
        Member member=memberRepository.findByNicknameAndIsDeleted(nickname, false);
        if (member==null){
            return null;
        }
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public MemberDto getMemberByEmail(String email) {
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null){
            return null;
        }
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public MemberDto getMemberByMemberId(Long memberId) {
        Member member=memberRepository.findByMemberIdAndIsDeleted(memberId, false);
        if (member==null){
            return null;
        }
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public List<MemberDto> getMemberList() {
        return null;
    }

    @Override
    public Member create(Member member) {
        return memberRepository.save(member);
    }

//    @Override
//    public MemberDto memberEntityToDto(Member member) {
//        MemberDto memberDto=new MemberDto();
//
//        return null;
//    }

    @Override
    public Member update(Member member) {
        return null;
    }

    @Override
    public int emailCheck(String email) {
        if(email==null)
            return 401;
        Pattern emailPattern = Pattern.compile("^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+\\.[a-zA-Z]{2,6}$");
        Matcher emailMatcher = emailPattern.matcher(email);
        if(!emailMatcher.find()){        // 유효성 검사
            return 402;
        }
        if (memberRepository.findByEmailAndIsDeleted(email, false)!=null) {      // 중복 검사
            return 403;
        }

        return 200;
    }

    @Override
    public int passwordCheck(String password) {
        if(password == null)
            return 401;
        // 비밀번호 포맷 확인(영문, 숫자포함 8~16자리)
        Pattern passPattern = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d).{8,16}$");
        Matcher passMatcher = passPattern.matcher(password);
        if(!passMatcher.find()){
            return 402;
        }
        return 200;
    }

    @Override
    public boolean nicknameCheck(String nickname) {
        return memberRepository.existsByNicknameAndIsDeleted(nickname, false);
    }

    @Override
    public int loginCheck(MemberLoginReq memberLoginReq) {
        String email = memberLoginReq.getEmail();
        String password = memberLoginReq.getPassword();
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null) {
            return 401;
        }

        if (passwordEncoder.matches(password,member.getPassword())) {
            return 200;
        }
        return 402;
    }
}