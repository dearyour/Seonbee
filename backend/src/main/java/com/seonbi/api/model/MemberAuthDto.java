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

    private Long memberId=0l;
    private String nickname;
    private Long imageId=0l;

    public MemberAuthDto(Long memberId, String nickname, Long imageId) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.imageId = imageId;
    }
}
