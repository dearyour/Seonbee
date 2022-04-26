package com.seonbi.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Member extends BaseEntity{
    // Wrapper 타입인 Long이나 Integer를 쓰면 id가 없는 경우엔 확실히 null이고, 그 자체로 id가 없다는걸 보장함.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private Long memberId;
    private String email;
    private String nickname;
    private Boolean isAdmin;
    private Boolean isKakao;
    private String birthday;    // 1997-04-10
    // @JsonIgnore  //다시 되돌려야함 jwt확인으로 인해 주석처리
    private String password;
    private String gender;
    private String mbti;
    private String job;
    private String interest;
    private String likelist;
    private String banlist;
    private Long imageId=0l;    // default는 기본 이미지

}
