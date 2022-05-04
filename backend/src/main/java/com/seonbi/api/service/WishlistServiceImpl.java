package com.seonbi.api.service;

import com.seonbi.api.model.WishlistDto;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Wishlist;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.ProductRepository;
import com.seonbi.db.repository.WishlistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService{

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    MemberRepository memberRepository;

    @Override
    public List<WishlistDto> getWishlist(Long hostId) {
        List<Wishlist> wishlists=wishlistRepository.findAllByMemberIdAndIsDeleted(hostId, false);
        List<WishlistDto> wishlistDtoList=new ArrayList<>();
        for (Wishlist wish: wishlists){
            Member giver=memberRepository.findByMemberIdAndIsDeleted(wish.getGiverId(), false);
            WishlistDto wishlistDto=modelMapper.map(
                    productRepository.findByProductIdAndIsDeleted(wish.getProductId(), false), WishlistDto.class);
            if (giver!=null){
                wishlistDto.setGiverName(giver.getNickname());
            }
            wishlistDtoList.add(wishlistDto);
        }
        return wishlistDtoList;
    }
}
