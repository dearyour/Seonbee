package com.seonbi.api.service;

import com.seonbi.api.model.ProductDto;

import java.util.List;

public interface ProductService {

    String getProductImage(Long productId);
    List<ProductDto> getProductAll();
    List<ProductDto> getProductAllByKeyword(String keyword);
    int addHitProduct(Long productId);
    int addGiveProduct(Long productId, int flag);   // flag: 더하면 1, 빼면 -1
    int addWishProduct(Long productId, int flag);
    int addRecommendProduct(Long productId);
}
