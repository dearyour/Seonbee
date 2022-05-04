package com.seonbi.api.service;

import com.seonbi.db.entity.Product;
import com.seonbi.db.repository.ProductRepository;
import com.seonbi.db.repository.WishlistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistServiceImpl implements WishlistService{

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WishlistRepository wishlistRepository;


}
