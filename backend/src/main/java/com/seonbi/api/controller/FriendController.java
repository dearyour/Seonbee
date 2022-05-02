
package com.seonbi.api.controller;

import com.seonbi.api.model.MemberAuthDto;
import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.FriendFollowAllowReq;
import com.seonbi.api.request.MemberCreateReq;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.MemberAuthRes;
import com.seonbi.api.response.MemberGetRes;
import com.seonbi.api.response.MemberLoginRes;
import com.seonbi.api.service.FriendService;
import com.seonbi.api.service.ImageService;
import com.seonbi.api.service.MemberAuthService;
import com.seonbi.api.service.MemberService;
import com.seonbi.db.entity.Member;
import com.seonbi.util.JwtTokenProvider;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

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
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));
        }
        int followFriendCode=friendService.followFriend(member.getMemberId(), friendId);
        if (followFriendCode==401){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "존재하지 않는 계정입니다."));
        } else if (followFriendCode==402){
            return ResponseEntity.status(402).body(BaseResponseBody.of(402, "이미 벗 요청을 했습니다."));
        } else if (followFriendCode==405){
            return ResponseEntity.status(405).body(BaseResponseBody.of(405, "이미 벗입니다."));
        } else if (followFriendCode==406){
            return ResponseEntity.status(406).body(BaseResponseBody.of(406, "자기 자신에게 벗 요청할 수 없습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @PostMapping("/follow/allow")
    public ResponseEntity<? extends BaseResponseBody> followFriendAllow(
            @ApiIgnore Authentication authentication, @RequestBody FriendFollowAllowReq friendFollowAllowReq) {
        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"사용자 권한이 없습니다."));
        }

        int followFriendAllowCode=friendService.followFriendAllow(member.getMemberId(), friendFollowAllowReq.getFriendId(), friendFollowAllowReq.getAllow());
        if (followFriendAllowCode==401){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "잘못된 요청입니다."));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }




}