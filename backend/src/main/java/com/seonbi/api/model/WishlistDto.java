package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class WishlistDto {
    /**
     * 호패 - 갖고싶소 목록
     */
    private Long wishlistId;
    private Long price;
    private String name;
    private String buyUrl;
    private String imageUrl;
    private Long giverId=0l;
    private String giverName;
}
