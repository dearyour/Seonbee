package com.seonbi.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberAuthRes {

    private Long memberId=0l;
    private String nickname;
    private String imageString;

}
