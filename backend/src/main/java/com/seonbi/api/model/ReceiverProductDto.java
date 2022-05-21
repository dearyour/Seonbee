package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReceiverProductDto {
    /**
     * 호패 - 주고싶소 개인 상품 목록
     */

    private Long productId;
    private Long price;
    private String name;
    private String buyUrl;
    private String imageUrl;
}
