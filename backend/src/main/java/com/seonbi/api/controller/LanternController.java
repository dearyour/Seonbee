package com.seonbi.api.controller;

import com.seonbi.api.model.LanternDto;
import com.seonbi.api.request.LanternCreateReq;
import com.seonbi.api.request.ScheduleCreateReq;
import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.response.LanternGetRes;
import com.seonbi.api.service.*;
import com.seonbi.db.entity.Lantern;
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

    @Autowired
    LanternService lanternService;

    @PostMapping("/schedule")
    public ResponseEntity<? extends BaseResponseBody> createSchedule(
            @RequestBody ScheduleCreateReq scheduleCreateReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        Schedule schedule=new Schedule();
        schedule.setMemberId(member.getMemberId());
        schedule.setTitle(scheduleCreateReq.getTitle());
        schedule.setScheduleDate(scheduleCreateReq.getScheduleDate());
        schedule.setBackground(scheduleCreateReq.getBackground());

        scheduleService.createSchedule(schedule);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }


    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createLantern(
            @RequestBody LanternCreateReq lanternCreateReq, @ApiIgnore Authentication authentication){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }
        if (!memberService.isMemberValid(lanternCreateReq.getHostId())){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "유효하지 않는 사용자입니다."));
        }
        Schedule schedule = scheduleService.getSchedule(lanternCreateReq.getScheduleId());
        if (schedule==null || schedule.getMemberId()!=lanternCreateReq.getHostId()){
            return ResponseEntity.status(401).body(BaseResponseBody.of(402, "유효하지 않는 일정입니다."));
        }

        Lantern lantern=new Lantern();
        lantern.setGuestId(member.getMemberId());
        lantern.setLanternType(lanternCreateReq.getLanternType());
        lantern.setContent(lanternCreateReq.getContent());
        lantern.setPosition(lanternCreateReq.getPosition());
        lantern.setHostId(lanternCreateReq.getHostId());
        lantern.setScheduleId(lanternCreateReq.getScheduleId());

        lanternService.createLantern(lantern);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }




    @GetMapping("/info/{lanternId}")
    public ResponseEntity<? extends BaseResponseBody> getLantern(
            @ApiIgnore Authentication authentication, @PathVariable Long lanternId){

        Member member=memberAuthService.memberAuthorize(authentication);
        if (member==null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "사용자 권한이 없습니다."));
        }

        LanternDto lantern = lanternService.getLantern(lanternId);
        return ResponseEntity.status(200).body(LanternGetRes.of(200, "success", lantern));
    }



}
