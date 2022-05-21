package com.seonbi.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
public class Member extends BaseEntity{
    // Wrapper 타입인 Long이나 Integer를 쓰면 id가 없는 경우엔 확실히 null이고, 그 자체로 id가 없다는걸 보장함.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private Long memberId;
    private String email;
    private String nickname;
    private Boolean isAdmin=false;
    private Boolean isKakao=false;
    private String birthday;    // 1997.04.10
    @JsonIgnore
    private String password;
    private String gender;
    private String mbti;
    private String interest;
    private String likelist;
    private String banlist;
    private Long imageId=0l;    // default는 기본 이미지
    private String verse;

}
