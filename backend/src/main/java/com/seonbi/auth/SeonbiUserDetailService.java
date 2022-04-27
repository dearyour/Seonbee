//package com.seonbi.auth;
//
//import com.seonbi.api.service.MemberService;
//import com.seonbi.db.entity.Member;
//import com.seonbi.db.repository.MemberRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//
///*
//
//SpringSecurity에서 유저의 정보를 가져오는 인터페이스이다
//SpringSecurity에서 유저의 정보를 불러오기 위해서 구현해야 하는 인터페이스로 기본 오버라이드 메소드로는
//loadUserByUsername이 있다
//
// */
//
//@Component
//public class SeonbiUserDetailService implements UserDetailsService {
//
//    MemberRepository memberRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
//        Member member=memberRepository.findByNicknameAndIsDeleted(nickname, false);
//        // 해당 닉네임을 가진 유저가 db에 존재한다면?
//        if (member!=null) {
//            return new SeonbiUserDetail(member);
//        }
//        return null;
//    }
//}