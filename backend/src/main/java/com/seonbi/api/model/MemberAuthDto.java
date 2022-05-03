package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberAuthDto{

    private Long memberId;
    private String nickname;
    private String imageString;

    public MemberAuthDto(Long memberId, String nickname, String imageString) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.imageString = imageString;
    }
}
