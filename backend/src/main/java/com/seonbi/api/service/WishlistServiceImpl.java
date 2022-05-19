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
            Product product=productRepository.findByProductIdAndIsDeleted(wish.getProductId(), false);
            if (product==null)  continue;
            WishlistDto wishlistDto=modelMapper.map(product , WishlistDto.class);
            wishlistDto.setWishlistId(wish.getWishlistId());
            if (giver!=null)    {
                wishlistDto.setGiverId(giver.getMemberId());
                wishlistDto.setGiverName(giver.getNickname());
            }
            wishlistDtoList.add(wishlistDto);
        }
        return wishlistDtoList;
    }

    @Override
    public int reserveWishlist(Long giverId, Long receiverId, Long wishlistId) {
        Wishlist wish = wishlistRepository.findByWishlistIdAndIsDeleted(wishlistId, false);
        if (wish==null || wish.getMemberId()!=receiverId)    return 401;    // 유효하지 않음
        if (wish.getGiverId()!=0l && !wish.getGiverId().equals(giverId))    return 402;    // 다른 사람이 예약
        System.out.println(wish.getGiverId());
        System.out.println(wish.getGiverId()==0l);
        System.out.println("!!!!!!!!!!!!!");
        if (wish.getGiverId()==0l)    wish.setGiverId(giverId);     // 예약하기
        else    wish.setGiverId(0l);    // 예약 취소하기
        wishlistRepository.save(wish);
        return 200;
    }

    @Override
    public int deleteWishlist(Long memberId, Long wishlistId) {
        Wishlist wish=wishlistRepository.findByWishlistIdAndIsDeleted(wishlistId, false);
        if (wish==null) return 401;
        if (!wish.getMemberId().equals(memberId))   return 403;
        wish.setIsDeleted(true);
        wishlistRepository.save(wish);
        return 200;
    }

    @Override
    public int addWishlist(Long memberId, Long productId) {
        if (wishlistRepository.existsWishlistByMemberIdAndProductIdAndIsDeleted(memberId, productId, false)) return 402;     // 상품 중복
        Wishlist wishlist=new Wishlist(productId, memberId);
        wishlistRepository.save(wishlist);
        return 200;
    }
}
