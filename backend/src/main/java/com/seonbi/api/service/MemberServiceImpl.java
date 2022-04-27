package com.seonbi.api.service;


import com.seonbi.api.model.MemberDto;
import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.MemberRepositorySupport;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public MemberDto getMemberByNickname(String nickname) {
        return modelMapper.map(memberRepository.findByNicknameAndIsDeleted(nickname, false), MemberDto.class);
    }

    @Override
    public MemberDto getMemberByEmail(String email) {
        return modelMapper.map(memberRepository.findByEmailAndIsDeleted(email, false), MemberDto.class);
    }

    @Override
    public MemberDto getMemberByMemberId(Long memberId) {
        return null;
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
}