package com.seonbi.api.controller;

import com.seonbi.api.model.WishlistDto;
import com.seonbi.api.request.ReserveProductReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.WishlistAllRes;
import com.seonbi.api.service.*;
import com.seonbi.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/api/profile/wish")
public class WishController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    WishlistService wishlistService;

    @Autowired
    ProductService productService;

    @Autowired
    FriendService friendService;

    @GetMapping("/{hostId}")
    public ResponseEntity<? extends BaseResponseBody> getFriendsWishlist(
            @PathVariable Long hostId, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)   return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        if (!memberService.isMemberValid(hostId))   // hostId가 없는 경우
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않은 사용자입니다."));

//        if (!friendService.isFriend(hostId, member.getMemberId()))    // 친구가 아닌 경우
//            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        List<WishlistDto> wishes=wishlistService.getWishlist(hostId);

        return ResponseEntity.status(200).body(WishlistAllRes.of(200, "success", wishes));
    }


    @PostMapping("/reserve")
    public ResponseEntity<? extends BaseResponseBody> reserveWishlist(
            @RequestBody ReserveProductReq reserveProductReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        Long receiverId=reserveProductReq.getReceiverId();
        if (!memberService.isMemberValid(receiverId))  // receiverId가 없는 경우
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않은 사용자입니다."));
        System.out.println(friendService.isFriend(receiverId, member.getMemberId()));
        System.out.println(receiverId);
        System.out.println(member.getMemberId());
        if (!friendService.isFriend(receiverId, member.getMemberId()))    // 친구가 아닌 경우
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        int reserveWishlistCode=wishlistService.reserveWishlist(
                member.getMemberId(), receiverId, reserveProductReq.getWishlistId());

        if (reserveWishlistCode==401)   return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않은 상품입니다."));
        if (reserveWishlistCode==402)   return ResponseEntity.status(402).body(BaseResponseBody.of(402, "이미 예약된 상품입니다."));


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }


    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<? extends BaseResponseBody> deleteWishlist(
            @PathVariable Long wishlistId, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        int deleteWishlistCode=wishlistService.deleteWishlist(member.getMemberId(), wishlistId);
        if (deleteWishlistCode==401)    return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않은 상품입니다."));
        if (deleteWishlistCode==403)    return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }



}
