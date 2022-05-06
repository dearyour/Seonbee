package com.seonbi.api.controller;

import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendReceiverDto;
import com.seonbi.api.request.GiveFriendProductReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.ReceiverProductAllRes;
import com.seonbi.api.response.RecommendReceiverAllRes;
import com.seonbi.api.service.MemberAuthService;
import com.seonbi.api.service.MemberService;
import com.seonbi.api.service.ReceiverService;
import com.seonbi.api.service.RecommendService;
import com.seonbi.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    RecommendService recommendService;

    @Autowired
    ReceiverService receiverService;

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> addGiveProduct(
            @RequestBody GiveFriendProductReq giveProductReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        int addGiveProductCode=recommendService.addGiveProduct(giveProductReq.getFriendId(), giveProductReq.getProductId());
        return ResponseEntity.status(200).body(RecommendReceiverAllRes.of(200, "success"));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<? extends BaseResponseBody> addWishProduct(
            @PathVariable Long productId, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }
        return ResponseEntity.status(200).body(ReceiverProductAllRes.of(200, "success"));
    }


}
