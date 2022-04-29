package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberDto {

    private Long memberId=0l;
    private String email;
    private String nickname;
    private String birthday;
    private String gender;
    private String mbti;
    private String interest;
    private String likelist;
    private String banlist;
    private String imageString;
    private String verse;
    private String job;
    private boolean isAdmin=false;
    private boolean isKakao=false;

}
