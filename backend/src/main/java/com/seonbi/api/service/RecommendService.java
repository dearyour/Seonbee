package com.seonbi.api.service;


import com.seonbi.api.model.*;
import com.seonbi.api.request.ReceiverInfoReq;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Product;

import java.util.List;

//선물추천
public interface RecommendService {

    List<RecommendProductDto> ProductRecommend(ReceiverInfoReq req, Long memberId);
    String NaverShopSearch(String keyword); // 네이버 쇼핑 api로 검색
    List<Product> StringToJson(String result); // 네이버 쇼핑 결과를 json으로 변환
    RecommendReceiverDto getGiveAll(Long memberId);
    List<ReceiverProductDto> getGiveProductAll(Long memberId, Long receiverId, Boolean isMember);
    int addGiveProduct(Long memberId, Long friendId, Long productId);
    List<RecommendDto> getRecommendAll(Long memberId);
    int saveRecommendGive(Long memberId, Long recommendId);
    List<RecommendProductDto> FriendProductRecommend(Long memberId, Member friend, Long price);
}
