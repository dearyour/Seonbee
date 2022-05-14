package com.seonbi.api.controller;

import com.seonbi.api.model.RecommendDto;
import com.seonbi.api.request.ReceiverInfoReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.RecommendAllRes;
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
@RequestMapping("/api")
public class RecommendController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    RecommendService recommendService;

    @Autowired
    ReceiverService receiverService;

    @GetMapping("/profile/recommend")
    public ResponseEntity<? extends BaseResponseBody> getRecommendAll(@ApiIgnore Authentication authentication) {

        Member member = memberAuthService.memberAuthorize(authentication);
        if (member == null) return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        List<RecommendDto> recommendList = recommendService.getRecommendAll(member.getMemberId());

        return ResponseEntity.status(200).body(RecommendAllRes.of(200, "success", recommendList));
    }

    @GetMapping("/profile/recommend/give/{recommendId}")
    public ResponseEntity<? extends BaseResponseBody> saveRecommendGive(
            @PathVariable Long recommendId, @ApiIgnore Authentication authentication) {

        Member member = memberAuthService.memberAuthorize(authentication);
        if (member == null) return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        int saveRecommendGiveCode = recommendService.saveRecommendGive(member.getMemberId(), recommendId);
        if (saveRecommendGiveCode == 401)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않은 정보입니다."));
        else if (saveRecommendGiveCode == 403)
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }


    @PostMapping("/recommend/receiver")
    public ResponseEntity<? extends BaseResponseBody> recommend(@RequestBody ReceiverInfoReq receiverInfoReq, @ApiIgnore Authentication authentication) {

        Member member=null;
        Long memberId=0l;
        if (authentication != null) {
             member = memberAuthService.memberAuthorize(authentication);
             memberId =member.getMemberId();
        }


        List<RecommendProductDto> productDtos = recommendService.ProductRecommend(receiverInfoReq, memberId);

        return ResponseEntity.status(200).body(RecommendProductAllRes.of(200, "Success", productDtos));
    }

}
