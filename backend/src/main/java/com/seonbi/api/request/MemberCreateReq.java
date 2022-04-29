package com.seonbi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberCreateReq {

    private String email;
    private String password;
    private String nickname;
    private String birthday;
    private String gender;
    private String mbti;
    private String interest;
    private String likelist;
    private String banlist;
    private String verse;

}
