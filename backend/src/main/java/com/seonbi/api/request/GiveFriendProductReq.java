package com.seonbi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class GiveFriendProductReq {
    /**
     * 저잣거리 - 벗에게 상품 주고싶소 넣기
     */
    private Long friendId;
    private Long productId;

}
