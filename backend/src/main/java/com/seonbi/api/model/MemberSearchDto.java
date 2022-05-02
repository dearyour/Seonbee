package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberSearchDto {

    /**
     * 사랑방 - 다른 회원 검색
     */
    private Long memberId=0l;
    private String nickname;
    private String imageString;
    boolean isFriend=false;
}
