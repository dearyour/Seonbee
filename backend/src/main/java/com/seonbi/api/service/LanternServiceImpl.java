package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.api.model.MemberDto;
import com.seonbi.db.entity.Lantern;
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
    public LanternDto getLantern(Long lanternId) {
        Lantern lantern=lanternRepository.findByLanternIdAndIsDeleted(lanternId, false);
        return modelMapper.map(lantern, LanternDto.class);
    }
}
