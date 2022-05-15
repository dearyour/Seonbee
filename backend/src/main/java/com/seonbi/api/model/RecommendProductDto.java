package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor

public class RecommendProductDto {
    /**
     * 챗봇 결과
     */
    private Long productId;
    private Long price;
    private String name;
    private Long recommendId=0l;
    private String buyUrl;
    private String imageUrl;
}
