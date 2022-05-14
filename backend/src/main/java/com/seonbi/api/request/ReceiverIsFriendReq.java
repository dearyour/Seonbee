package com.seonbi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReceiverIsFriendReq {
    /**
     * 주소 싶소 - 개인 목록
     */
    private Long receiverId;
    private Boolean isFriend;

}
