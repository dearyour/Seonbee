package com.seonbi.api.service;

import com.seonbi.api.model.*;
import com.seonbi.common.util.DdayUtil;
import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Schedule;
import com.seonbi.db.repository.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WishlistRepository wishlistRepository;

    @Override
    public String getProductImage(Long productId) {
        Product product= productRepository.findByProductIdAndIsDeleted(productId, false);
        if (product==null) {
            return null;
        }
        return product.getImageUrl();
    }

    @Override
    public List<ProductDto> getProductAll() {
        List<Product> products=productRepository.findAll();
        List<ProductDto> productDtoList=modelMapper.map(products, new TypeToken<List<ProductDto>>() {}.getType());

        return productDtoList;
    }

    @Override
    public List<ProductDto> getProductAllByKeyword(String keyword) {
        List<Product> products=productRepository.findAllByNameContains(keyword);
        List<ProductDto> productDtoList=modelMapper.map(products, new TypeToken<List<ProductDto>>() {}.getType());

        return productDtoList;
    }
}
