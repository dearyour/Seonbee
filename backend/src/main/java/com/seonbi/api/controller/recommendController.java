package com.seonbi.api.controller;


import com.seonbi.api.request.MemberCreateReq;
import com.seonbi.api.request.ReceiverInfoReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommend")
public class recommendController {

    @Autowired
    RecommendService recommendService;

@PostMapping("/receiver")
    public ResponseEntity<? extends BaseResponseBody> recommend(@RequestBody ReceiverInfoReq receiverInfoReq)
    {



        recommendService.ProductRecommend(receiverInfoReq);



        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));



    }



}
