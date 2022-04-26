package com.seonbi.api.service;


import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;


    @Override
    public Member getMemberByMemberNickname(String nickname) {
        return memberRepository.findByNickname(nickname);
    }

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    public void register(Member member) {

        System.out.println("등록 서비스");
        memberRepository.save(member);
    }
}