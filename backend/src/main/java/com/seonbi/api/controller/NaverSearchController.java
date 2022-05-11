package com.seonbi.api.controller;

import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.service.NaverSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/naver")
public class NaverSearchController {


    @Autowired
    NaverSearchService naverSearchService;

    @PostMapping("/search")
    public ResponseEntity<? extends BaseResponseBody> search() throws IOException {

       // naverSearchService.linkCrawling("https://search.shopping.naver.com/gate.nhn?id=21715899389");
        naverSearchService.saveResults();
           // naverSearchService.txtRead();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


}
