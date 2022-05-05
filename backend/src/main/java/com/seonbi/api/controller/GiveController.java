package com.seonbi.api.controller;

import com.seonbi.api.model.ReceiverDto;
import com.seonbi.api.model.RecommendReceiverDto;
import com.seonbi.api.model.WishlistDto;
import com.seonbi.api.request.ReceiverIsMemberReq;
import com.seonbi.api.request.ReserveProductReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.WishlistAllRes;
import com.seonbi.api.service.*;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
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

    @Autowired
    ReceiverService receiverService;

    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> getGiveAll(@ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        List<RecommendReceiverDto> recommendReceiverDtoList=recommendService.getGiveAll(member.getMemberId());
//        List<ReceiverDto> receiverList=receiverService.getGiveReceiverAll(member.getMemberId());

        return ResponseEntity.status(200).body(WishlistAllRes.of(200, "success", wishes));
    }

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> getGive(
            @RequestBody ReceiverIsMemberReq receiverIsMemberReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        Receiver receiver=receiverService.getGive(
                receiverIsMemberReq.getReceiverId(), receiverIsMemberReq.getIsMember());



        return ResponseEntity.status(200).body(WishlistAllRes.of(200, "success", wishes));
    }


}
