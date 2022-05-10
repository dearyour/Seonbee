package com.seonbi.api.service;


import com.seonbi.api.request.ReceiverInfoReq;
import com.seonbi.db.entity.Product;

import java.util.List;

//선물추천
public interface RecommendService {

    void ProductRecommend(ReceiverInfoReq req);
    String NaverShopSearch(String keyword); // 네이버 쇼핑 api로 검색
    List<Product> StringToJson(String result); // 네이버 쇼핑 결과를 json으로 변환
}
