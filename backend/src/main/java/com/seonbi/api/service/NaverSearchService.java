package com.seonbi.api.service;

import com.seonbi.db.entity.Product;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface NaverSearchService {

    List<String> txtRead(); //keyword 읽기
    List<Product> StringToJson(String result); // 네이버 쇼핑 결과를 json으로 변환
    String NaverShopSearch(String keyword); // 네이버 쇼핑 api로 검색
    void saveResults();
    String linkCrawling(String link) throws IOException;
    void csvRead(Set<Product> set);
}
