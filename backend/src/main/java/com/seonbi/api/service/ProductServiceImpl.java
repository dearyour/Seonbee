package com.seonbi.api.service;

import com.seonbi.api.model.FriendDdayDto;
import com.seonbi.api.model.FriendDto;
import com.seonbi.api.model.FriendFollowDto;
import com.seonbi.api.model.FriendScheduleDto;
import com.seonbi.common.util.DdayUtil;
import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Schedule;
import com.seonbi.db.repository.*;
import org.modelmapper.ModelMapper;
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
}
