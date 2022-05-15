package com.seonbi.api.controller;

import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendReceiverDto;
import com.seonbi.api.request.ReceiverIsFriendReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.ReceiverProductAllRes;
import com.seonbi.api.response.RecommendReceiverAllRes;
import com.seonbi.api.service.*;
import com.seonbi.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/api/profile/give")
public class GiveController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    RecommendService recommendService;

    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> getGiveAll(@ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        RecommendReceiverDto receiverList=recommendService.getGiveAll(member.getMemberId());
        return ResponseEntity.status(200).body(RecommendReceiverAllRes.of(200, "success", receiverList));
    }

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> getGiveProductAll(
            @RequestBody ReceiverIsFriendReq receiverIsFriendReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        List<ReceiverProductDto> productDtoList = recommendService.getGiveProductAll(
                member.getMemberId(), receiverIsFriendReq.getReceiverId(), receiverIsFriendReq.getIsFriend());
        return ResponseEntity.status(200).body(ReceiverProductAllRes.of(200, "success", productDtoList));
    }

}
