package com.seonbi.api.service;

import com.seonbi.api.model.ReceiverDto;
import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendDto;
import com.seonbi.api.model.RecommendReceiverDto;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
import com.seonbi.db.repository.*;
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

    @Autowired
    ProductRepository productRepository;

    @Autowired
    FriendService friendService;

    @Override
    public RecommendReceiverDto getGiveAll(Long memberId) {
        List<Recommend> recommends = recommendRepository.findAllByMemberIdAndIsSavedAndIsDeleted(memberId, false, false);
        List<ReceiverDto> memberList=new ArrayList<>();
        List<ReceiverDto> noneMemberList=new ArrayList<>();
        for (Recommend recommend: recommends){
            Receiver receiver = receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            if (receiver==null){
                continue;
            }
            ReceiverDto receiverDto=modelMapper.map(receiver, ReceiverDto.class);
            if (recommend.getIsFriend()){
                Member receiverMember=memberRepository.findByMemberIdAndIsDeleted(recommend.getReceiverId(), false);
                if (receiverMember!=null && friendService.isFriend(memberId, receiverMember.getMemberId())){  // 추천받은 사람이 친구인 경우
                    receiverDto.setImageString(imageService.getImage(receiverMember.getImageId()));
                    memberList.add(receiverDto);
                }
            } else {      // 친구가 아닌 경우
                receiverDto.setImageString(imageService.getImage(0l));
                noneMemberList.add(receiverDto);
            }
        }
        return new RecommendReceiverDto(noneMemberList, memberList);
    }

    @Override
    public List<ReceiverProductDto> getGiveProductAll(Long memberId, Long receiverId, Boolean isFriend) {
        List<Recommend> recommends = recommendRepository.findAllByMemberIdAndReceiverIdAndIsSavedAndIsFriendAndIsDeleted(
                memberId, receiverId, true, isFriend,false);
        List<ReceiverProductDto> productDtoList=new ArrayList<>();
        for (Recommend recommend: recommends){
            ReceiverProductDto receiverProductDto=modelMapper.map(
                    productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false), ReceiverProductDto.class);
            productDtoList.add(receiverProductDto);
        }

        return productDtoList;
    }

    @Override
    public int addGiveProduct(Long memberId, Long friendId, Long productId) {
        if (!memberService.isMemberValid(friendId)){
            return 401;
        }
        if (!friendService.isFriend(memberId, friendId)){
            return 403;
        }

        Recommend recommend=new Recommend(productId, friendId, memberId, true, true);
        recommendRepository.save(recommend);

        return 200;
    }

    @Override
    public List<RecommendDto> getRecommendAll(Long memberId) {
        List<Recommend> recommends=recommendRepository.findAllByMemberIdAndIsDeleted(memberId, false);
        List<RecommendDto> recommendList=new ArrayList<>();
        for (Recommend recommend: recommends){
            Product product=productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false);
            if (product==null)  continue;
            RecommendDto recommendDto = modelMapper.map(product, RecommendDto.class);    // 상품 정보 넣기
            recommendDto.setRecommendId(recommend.getRecommendId());
            recommendDto.setIsSaved(recommend.getIsSaved());
            Receiver receiver=receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            if (receiver==null)     continue;
            if (recommend.getIsFriend()){   // 친구인 경우 회원 닉네임
                Member member=memberRepository.findByMemberIdAndIsDeleted(recommend.getReceiverId(), false);
                if (member==null)   continue;
                recommendDto.setReceiverName(member.getNickname());
            } else {    // 친구가 아닌 경우 receiver name
                recommendDto.setReceiverName(receiver.getName());
            }

            recommendList.add(recommendDto);
        }
        return recommendList;
    }

    @Override
    public int saveRecommendGive(Long memberId, Long recommendId) {
        Recommend recommend = recommendRepository.findByRecommendIdAndIsDeleted(recommendId, false);
        if (recommend==null)    return 401;
        if (!recommend.getMemberId().equals(memberId))  return 403;
        recommend.setIsSaved(true);
        recommendRepository.save(recommend);
        return 200;
    }
}
