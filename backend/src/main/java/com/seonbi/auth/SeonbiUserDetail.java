package com.seonbi.auth;

import com.seonbi.db.entity.Member;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;



/*
security 세션 영역이 있다
여기에 세션 정보를 저장해주는데 여기 들어갈 수 있는 객체가 Authentication 객체이다

Authentication 객체안에 user정보를 저장할 때는 userDetails 타입 객체를 사용한다

seonbiUserDetail는    UserDetails 를 구현하므로   Authentication 안에 넣을 수 있다


 */

@Getter
@ToString
public class SeonbiUserDetail implements UserDetails {

    private Member member;

    List<GrantedAuthority> roles = new ArrayList<>();

    public SeonbiUserDetail(Member member) {
        this.member = member;
    }

    // 해당 유저의 권한 목록을 리턴
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    // 계정의 비밀번호를 리턴
    @Override
    public String getPassword() {
        return member.getPassword();
    }

    // 계정의 고유한 값을 리턴 ( ex : DB PK값 , 닉네임도 중복이 안되는데 괜찮은가?)
    @Override
    public String getUsername() {
        return member.getEmail();
    }

    // 계정의 만료 여부 리턴   = true (만료 안됨)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정의 잠김 여부 리턴  = true (잠기지 않음)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호 만료 여부 리턴  =true (만료 안됨)
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }


    // 계정의 활성화 여부 리턴  = true (활성화 됨)
    @Override
    public boolean isEnabled() {
        return false;
    }

//    public void setAuthorities(List<GrantedAuthority> roles) {
//        this.roles = roles;
//    }
}