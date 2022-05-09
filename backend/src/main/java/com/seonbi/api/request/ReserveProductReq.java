package com.seonbi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReserveProductReq {
    /**
     * 호패 - 갖고싶소 선물 약속하기
     */

    private Long receiverId;
    private Long wishlistId;
}
