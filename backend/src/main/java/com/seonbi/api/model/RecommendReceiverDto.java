package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class RecommendReceiverDto {
    /**
     * 호패 - 주고싶소 목록
     */
    private Long receiverId;
    private String name;
    private Boolean isMember;
    private String imageString;

}
