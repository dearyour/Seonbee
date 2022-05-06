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
    private String buyUrl;
    private String imageUrl;
}
