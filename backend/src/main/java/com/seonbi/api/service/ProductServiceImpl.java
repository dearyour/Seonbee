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
        long beforeTime = System.currentTimeMillis(); //코드 실행 전에 시간 받아오기

        List<Product> products=productRepository.findTop1000ByOrderByRecommendDesc();
//        System.out.println("db에서 가져오기 시간차이(m) : "+(System.currentTimeMillis()-beforeTime)/1000.0);
        List<ProductDto> productDtoList=modelMapper.map(products, new TypeToken<List<ProductDto>>() {}.getType());
//        List<ProductDto> productDtoList2=new ArrayList<>();
//        for (Product product:products){
//            ProductDto productDto=modelMapper.map(product, ProductDto.class);
//            productDtoList2.add(productDto);
//        }
//        System.out.println("dto 변환 시간차이(m) : "+(System.currentTimeMillis()-beforeTime)/1000.0);
//        System.out.println(productDtoList.size());
        return productDtoList;
    }

    @Override
    public List<ProductDto> getProductAllByKeyword(String keyword) {
        List<Product> products=productRepository.findAllByNameContains(keyword);
        List<ProductDto> productDtoList=modelMapper.map(products, new TypeToken<List<ProductDto>>() {}.getType());

        return productDtoList;
    }

    @Override
    public int addHitProduct(Long productId) {
        Product product = productRepository.findByProductIdAndIsDeleted(productId, false);
        if (product==null)  return 401;
        product.setHit(product.getHit()+1);
        productRepository.save(product);
        return 200;
    }
    @Override
    public int addGiveProduct(Long productId, int flag) {
        Product product = productRepository.findByProductIdAndIsDeleted(productId, false);
        if (product==null)  return 401;
        product.setGive(product.getGive()+flag);
        productRepository.save(product);
        return 200;
    }
    @Override
    public int addWishProduct(Long productId, int flag) {
        Product product = productRepository.findByProductIdAndIsDeleted(productId, false);
        if (product==null)  return 401;
        product.setWish(product.getWish()+flag);
        productRepository.save(product);
        return 200;
    }
    @Override
    public int addRecommendProduct(Long productId) {
        Product product = productRepository.findByProductIdAndIsDeleted(productId, false);
        if (product==null)  return 401;
        product.setRecommend(product.getRecommend()+1);
        productRepository.save(product);
        return 200;
    }
}
