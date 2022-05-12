package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductDto {
    /**
     * 상품
     */
    private Long productId;
    private Long price;
    private String name;
    private String brand;
    private String category1;
    private String category2;
    private String category3;
    private Long wish;
    private Long give;
    private Long hit;
    private Long recommend;
    private String buyUrl;
    private String imageUrl;
}
