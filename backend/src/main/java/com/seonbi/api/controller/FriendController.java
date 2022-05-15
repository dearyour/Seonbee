
package com.seonbi.api.controller;

import com.seonbi.api.model.*;
import com.seonbi.api.request.FriendFollowAllowReq;
import com.seonbi.api.response.*;
import com.seonbi.api.service.FriendService;
import com.seonbi.api.service.ImageService;
import com.seonbi.api.service.MemberAuthService;
import com.seonbi.api.service.MemberService;
import com.seonbi.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/api/friend")
public class FriendController {

    @Autowired
    MemberService memberService;

    @Autowired
    ImageService imageService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    FriendService friendService;


    @GetMapping("/follow/{friendId}")
    public ResponseEntity<? extends BaseResponseBody> followFriend(
            @ApiIgnore Authentication authentication, @PathVariable("friendId") Long friendId) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)   return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));

        int followFriendCode=friendService.followFriend(member.getMemberId(), friendId);
        if (followFriendCode==401)  return ResponseEntity.status(401).body(BaseResponseBody.of(401, "존재하지 않는 계정입니다."));
        if (followFriendCode==402)  return ResponseEntity.status(402).body(BaseResponseBody.of(402, "이미 벗 요청을 했습니다."));
        if (followFriendCode==405)  return ResponseEntity.status(405).body(BaseResponseBody.of(405, "이미 벗입니다."));
        if (followFriendCode==406)  return ResponseEntity.status(406).body(BaseResponseBody.of(406, "자기 자신에게 벗 요청할 수 없습니다."));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/follow")
    public ResponseEntity<? extends BaseResponseBody> getFollowFriendAll(@ApiIgnore Authentication authentication) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));

        List<FriendFollowDto> friendFollowDtoList=friendService.getFollowFriendAll(member.getMemberId());
        return ResponseEntity.status(200).body(FriendFollowGetAllRes.of(200, "success", friendFollowDtoList));
    }

    @PostMapping("/follow/allow")
    public ResponseEntity<? extends BaseResponseBody> followFriendAllow(
            @ApiIgnore Authentication authentication, @RequestBody FriendFollowAllowReq friendFollowAllowReq) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));

        int followFriendAllowCode=friendService.followFriendAllow(member.getMemberId(), friendFollowAllowReq.getFriendId(), friendFollowAllowReq.getAllow());
        if (followFriendAllowCode==401)    return ResponseEntity.status(401).body(BaseResponseBody.of(401, "잘못된 요청입니다."));

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/dday")
    public ResponseEntity<? extends BaseResponseBody> getFriendDdayAll(@ApiIgnore Authentication authentication) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));

        List<FriendDdayDto> friendList=friendService.getFriendDdayAll(member.getMemberId());
        return ResponseEntity.status(200).body(FriendDdayAllRes.of(200, "success", friendList));
    }

    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> getFriendAll(@ApiIgnore Authentication authentication) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));

        List<FriendDto> friendList=friendService.getFriendAll(member.getMemberId());
        return ResponseEntity.status(200).body(FriendAllRes.of(200, "success", friendList));
    }

    @GetMapping("/schedule")
    public ResponseEntity<? extends BaseResponseBody> getFriendCalendarAll(@ApiIgnore Authentication authentication) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null)    return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));

        List<FriendCalendarDto> friendList=friendService.getFriendCalendarAll(member.getMemberId());
        return ResponseEntity.status(200).body(FriendCalendarAllRes.of(200, "success", friendList));
    }

}