package com.seonbi.api.service;

import com.seonbi.api.model.ReceiverDto;
import com.seonbi.api.model.RecommendReceiverDto;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.ReceiverRepository;
import com.seonbi.db.repository.RecommendRepository;
import com.seonbi.db.repository.WishlistRepository;
import org.checkerframework.checker.units.qual.A;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendServiceImpl implements RecommendService{

    @Autowired
    ReceiverRepository receiverRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    RecommendRepository recommendRepository;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ImageService imageService;

    @Override
    public List<RecommendReceiverDto> getGiveAll(Long memberId) {
        List<Recommend> recommends = recommendRepository.findAllByMemberIdAndIsDeleted(memberId, false);
        List<RecommendReceiverDto> receiverDtoList=new ArrayList<>();
        for (Recommend recommend: recommends){
            Receiver receiver = receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            if (receiver==null){
                continue;
            }
            RecommendReceiverDto receiverDto=modelMapper.map(receiver, RecommendReceiverDto.class);
            Member receiverMember=memberRepository.findByMemberIdAndIsDeleted(receiver.getMemberId(), false);
            if (receiverMember==null){  // 추천받은 사람이 회원이 아닌 경우
                receiverDto.setIsMember(false);
                receiverDto.setImageString(imageService.getImage(0l));
            } else {      // 회원인 경우
                receiverDto.setIsMember(true);
                receiverDto.setImageString(imageService.getImage(receiverMember.getImageId()));
            }

            receiverDtoList.add(receiverDto);

        }
        return receiverDtoList;
    }
}
