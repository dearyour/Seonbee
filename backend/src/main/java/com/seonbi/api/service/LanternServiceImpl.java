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
        if (lantern==null){
            return null;
        }
        LanternDto lanternDto=modelMapper.map(lantern, LanternDto.class);
        Member guest=memberRepository.findByMemberIdAndIsDeleted(lantern.getGuestId(), false);
        if (guest==null){   // 글 쓴 사람이 없는 경우 null
            return null;
        }
        lanternDto.setNickname(guest.getNickname());
        return lanternDto;
    }

    @Override
    public void createLantern(Lantern lantern) {
        lanternRepository.save(lantern);
    }
}
