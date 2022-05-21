package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.api.model.ScheduleDto;
import com.seonbi.db.entity.Friend;
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

import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService{

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    LanternRepository lanternRepository;

    @Override
    public void createSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
    }

    @Override
    public Schedule getSchedule(Long scheduleId) {
        return scheduleRepository.findByScheduleIdAndIsDeleted(scheduleId, false);
    }

    @Override
    public List<ScheduleDto> getScheduleAll(Long hostId) {
        List<Schedule> schedules = scheduleRepository.findAllByMemberIdAndIsDeletedOrderByScheduleDate(hostId, false);
        List<ScheduleDto> scheduleDtos=new ArrayList<>();
        for (Schedule s:schedules){
            ScheduleDto scheduleDto=modelMapper.map(s, ScheduleDto.class);
            List<Lantern> lanterns=lanternRepository.findAllByScheduleIdAndIsDeleted(s.getScheduleId(), false);
            List<LanternDto> lanternDtos=new ArrayList<>();
            for (Lantern lantern: lanterns){
                LanternDto lanternDto=modelMapper.map(lantern, LanternDto.class);
                Member guest=memberRepository.findByMemberIdAndIsDeleted(lantern.getGuestId(), false);
                if (guest==null) continue;  // 글 쓴 사람이 없는 경우 null
                lanternDto.setNickname(guest.getNickname());
                lanternDtos.add(lanternDto);
            }
            scheduleDto.setLanternList(lanternDtos);
            scheduleDtos.add(scheduleDto);
        }

        return scheduleDtos;
    }

}
