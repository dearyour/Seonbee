package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Schedule;
import com.seonbi.db.repository.FriendRepository;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService{

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Override
    public void createSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
    }

    @Override
    public Schedule getSchedule(Long scheduleId) {
        return scheduleRepository.findScheduleByScheduleIdAndIsDeleted(scheduleId, false);
    }

}
