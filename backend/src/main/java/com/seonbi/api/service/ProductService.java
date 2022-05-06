package com.seonbi.api.service;

import com.seonbi.api.model.ProductDto;

import java.util.List;

public interface ProductService {

    String getProductImage(Long productId);
    List<ProductDto> getProductAll();
}
