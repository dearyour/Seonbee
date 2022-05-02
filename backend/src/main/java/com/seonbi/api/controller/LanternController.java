package com.seonbi.api.controller;

import com.seonbi.api.request.ScheduleCreateReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.service.ImageService;
import com.seonbi.api.service.MemberAuthService;
import com.seonbi.api.service.MemberService;
import com.seonbi.api.service.ScheduleService;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/profile/lantern")
public class LanternController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberAuthService memberAuthService;

    @Autowired
    ScheduleService scheduleService;

    @PostMapping("/schedule")
    public ResponseEntity<? extends BaseResponseBody> createSchedule(
            @RequestBody ScheduleCreateReq scheduleCreateReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        Schedule schedule=new Schedule();
        schedule.setMemberId(member.getMemberId());
        schedule.setContent(scheduleCreateReq.getContent());
        schedule.setScheduleDate(scheduleCreateReq.getScheduleDate());
        schedule.setBackground(scheduleCreateReq.getBackground());

        scheduleService.createSchedule(schedule);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }



}
