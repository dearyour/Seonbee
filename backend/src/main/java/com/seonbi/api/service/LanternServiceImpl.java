package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.api.model.MemberDto;
import com.seonbi.db.entity.Lantern;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Schedule;
import com.seonbi.db.repository.FriendRepository;
import com.seonbi.db.repository.LanternRepository;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.ScheduleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanternServiceImpl implements LanternService{

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    LanternRepository lanternRepository;

    @Override
    public LanternDto getLantern(Long lanternId) {
        Lantern lantern=lanternRepository.findByLanternIdAndIsDeleted(lanternId, false);
        if (lantern==null)    return null;
        LanternDto lanternDto=modelMapper.map(lantern, LanternDto.class);
        Member guest=memberRepository.findByMemberIdAndIsDeleted(lantern.getGuestId(), false);
        if (guest==null)    return null;  // 글 쓴 사람이 없는 경우 null
        lanternDto.setNickname(guest.getNickname());
        return lanternDto;
    }

    @Override
    public void createLantern(Lantern lantern) {
        lanternRepository.save(lantern);
    }

    @Override
    public int deleteLantern(Long memberId, Long lanternId) {
        Lantern lantern = lanternRepository.findByLanternIdAndIsDeleted(lanternId, false);
        if (lantern==null)    return 401;
        if (!lantern.getGuestId().equals(memberId))    return 403;
        lantern.setIsDeleted(true);
        lanternRepository.save(lantern);
        return 200;
    }

    @Override
    public int deleteSchedule(Long memberId, Long scheduleId) {
        Schedule schedule=scheduleRepository.findByScheduleIdAndIsDeleted(scheduleId, false);
        if (schedule==null)    return 401;
        if (!schedule.getMemberId().equals(memberId))    return 403;
        schedule.setIsDeleted(true);
        scheduleRepository.save(schedule);
        return 200;
    }
}
