package com.seonbi.api.service;

import com.seonbi.api.model.*;
import com.seonbi.common.util.DdayUtil;
import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Schedule;
import com.seonbi.db.entity.Wishlist;
import com.seonbi.db.repository.FriendRepository;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.db.repository.ScheduleRepository;
import com.seonbi.db.repository.WishlistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService{

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    ProductService productService;

    @Autowired
    WishlistRepository wishlistRepository;


    @Override
    public int followFriend(Long memberId, Long friendId) {
        if (memberId.equals(friendId))  return 406;     // 자기 자신에게
        if (memberRepository.findByMemberIdAndIsDeleted(friendId, false)==null)    return 401;  // 벗 요청받은 사람 계정이 없음
        Friend before=friendRepository.findByFollowerIdAndFolloweeIdAndIsDeleted(memberId, friendId, false);
        if (before!=null&&"BEFORE".equals(before.getIsAllowed()))   return 402;     // 이미 벗 요청 함
        if (before!=null&&"OK".equals(before.getIsAllowed()))    return 405;    // 이미 벗

        // before==null 이거나 요청을 한번 거절한 경우
        Friend friend = new Friend();
        friend.setFollowerId(memberId);
        friend.setFolloweeId(friendId);
        friendRepository.save(friend);
        return 200;

    }

    @Override
    public int followFriendAllow(Long followeeId, Long followerId, String allow) {
        Friend friend = friendRepository.findByFollowerIdAndFolloweeIdAndIsAllowedAndIsDeleted(
                followerId, followeeId, "BEFORE", false);
        if (friend==null)   return 401;
        friend.setIsAllowed(allow);
        friendRepository.save(friend);
        return 200;
    }

    @Override
    public List<FriendFollowDto> getFollowFriendAll(Long followeeId) {
        List<Friend> friends=friendRepository.findAllByFolloweeIdAndIsAllowedAndIsDeleted(followeeId, "BEFORE", false);
        List<FriendFollowDto> friendFollowDtoList=new ArrayList<>();
        for (Friend friend: friends){
            Member member= memberRepository.findByMemberIdAndIsDeleted(friend.getFollowerId(), false);
            if (member==null)    continue;
            String imageString=imageService.getImage(member.getImageId());
            FriendFollowDto friendFollowDto=new FriendFollowDto(member.getMemberId(), member.getNickname(), imageString);
            friendFollowDtoList.add(friendFollowDto);
        }
        return friendFollowDtoList;
    }

    @Override
    public boolean isFriend(Long memberId1, Long memberId2) {
        // 회원 둘다 유효하다는 전제하에
        if (friendRepository.findByFollowerIdAndFolloweeIdAndIsAllowedAndIsDeleted(memberId1, memberId2, "OK", false)!=null
                || friendRepository.findByFollowerIdAndFolloweeIdAndIsAllowedAndIsDeleted(memberId2, memberId1, "OK", false)!=null){
            return true;
        }
        return false;
    }

    @Override
    public List<FriendDdayDto> getFriendDdayAll(Long memberId) {
        List<FriendDdayDto> friendDdayDtoList=new ArrayList<>();
        List<Long> friendIdList=getFriendIdAll(memberId);
        for (Long friendId: friendIdList){
            Member member= memberRepository.findByMemberIdAndIsDeleted(friendId, false);    // 친구 정보
            if (member==null)   continue;
            List<Schedule> schedules=scheduleRepository.findAllByMemberIdAndIsDeletedOrderByScheduleDate(friendId, false);  // 친구 일정
            for (Schedule schedule: schedules) {    // 같은 친구라도 일정별로 따로 넣기
                String dday=DdayUtil.Dday(schedule.getScheduleDate());
                if (dday==null)     continue;   // 일주일 지난 경우
                FriendDdayDto friendDdayDto = new FriendDdayDto(friendId, member.getNickname(),
                        imageService.getImage(member.getImageId()), dday, schedule.getTitle());
                friendDdayDtoList.add(friendDdayDto);
            }

        }
        return friendDdayDtoList;
    }

    @Override
    public List<Long> getFriendIdAll(Long memberId) {
        // 내가 followee 인 경우 친구들은 follower
        List<Friend> followers = friendRepository.findAllByFolloweeIdAndIsAllowedAndIsDeleted(memberId, "OK", false);
        List<Friend> followees = friendRepository.findAllByFollowerIdAndIsAllowedAndIsDeleted(memberId, "OK", false);
        List<Long> friendIdList=new ArrayList<>();
        for (Friend f: followers){
            friendIdList.add(f.getFollowerId());
        }
        for (Friend f: followees){
            friendIdList.add(f.getFolloweeId());
        }

        return friendIdList;
    }

    @Override
    public List<FriendDto> getFriendAll(Long memberId) {
        List<FriendDto> friendDtoList=new ArrayList<>();
        List<Long> friendIdList=getFriendIdAll(memberId);
        for (Long friendId: friendIdList){
            Member member=memberRepository.findByMemberIdAndIsDeleted(friendId, false);    // 친구 정보
            if (member==null)   continue;
            List<Schedule> schedules=scheduleRepository.findAllByMemberIdAndIsDeletedOrderByScheduleDate(friendId, false);  // 친구 일정
            List<FriendScheduleDto> scheduleDtoList=new ArrayList<>();
            for (Schedule schedule: schedules) {    // 한 친구의 일정을 여러개 리스트로 담기
                String dday=DdayUtil.Dday(schedule.getScheduleDate());
                if (dday==null)    continue;    // 일주일이 지난 경우
                FriendScheduleDto scheduleDto=new FriendScheduleDto(dday, schedule.getTitle());
                scheduleDtoList.add(scheduleDto);
            }
            List<Wishlist> wishlists=wishlistRepository.findAllByMemberIdAndIsDeleted(friendId, false);
            List<String> imageUrls=new ArrayList<>();
            for (Wishlist wishlist: wishlists) {
                imageUrls.add(productService.getProductImage(wishlist.getProductId()));
            }
            FriendDto friendDto=new FriendDto(friendId, member.getNickname(), imageService.getImage(member.getImageId()),
                    member.getVerse(), imageUrls, scheduleDtoList);
            friendDtoList.add(friendDto);
        }
        return friendDtoList;
    }

    @Override
    public List<FriendCalendarDto> getFriendCalendarAll(Long memberId) {
        List<FriendCalendarDto> friendCalendarDtoList=new ArrayList<FriendCalendarDto>();
        List<Long> friendIdList=getFriendIdAll(memberId);
        for (Long friendId: friendIdList){
            Member member= memberRepository.findByMemberIdAndIsDeleted(friendId, false);    // 친구 정보
            if (member==null)   continue;
            List<Schedule> schedules=scheduleRepository.findAllByMemberIdAndIsDeletedOrderByScheduleDate(friendId, false);  // 친구 일정
            for (Schedule schedule: schedules) {    // 같은 친구라도 일정별로 따로 넣기
                FriendCalendarDto friendCalendarDto = new FriendCalendarDto(friendId, member.getNickname(),
                        schedule.getScheduleDate(), schedule.getTitle());
                friendCalendarDtoList.add(friendCalendarDto);
            }
        }
        return friendCalendarDtoList;
    }

    @Override
    public List<FriendFollowDto> shopGetFriendAll(Long memberId) {
        List<FriendFollowDto> friendDtoList=new ArrayList<>();
        List<Long> friendIdList=getFriendIdAll(memberId);
        for (Long friendId: friendIdList){
            Member member=memberRepository.findByMemberIdAndIsDeleted(friendId, false);    // 친구 정보
            if (member==null)   continue;
            FriendFollowDto friendDto=new FriendFollowDto(
                    friendId, member.getNickname(), imageService.getImage(member.getImageId()));
            friendDtoList.add(friendDto);
        }
        return friendDtoList;
    }

    @Override
    public String getFriendStatus(Long memberId1, Long memberId2) {     // 로그인한 회원, 상대 회원
        Friend friend1 = friendRepository.findByFollowerIdAndFolloweeIdAndIsDeleted(memberId1, memberId2, false);
        Friend friend2 = friendRepository.findByFollowerIdAndFolloweeIdAndIsDeleted(memberId2, memberId1, false);
        if (friend1==null && friend2==null) return "unfriend";
        if ((friend1!=null && "OK".equals(friend1.getIsAllowed())) || (friend2!=null && "OK".equals(friend2.getIsAllowed())))   return "friend";
        if (friend1!=null && "BEFORE".equals(friend1.getIsAllowed()))  return "requesting";     // 로그인한 회원이 친구 요청 보낸 경우
        if (friend2!=null && "BEFORE".equals(friend2.getIsAllowed()))    return "requested";  // 로그인한 회원이 친구 요청 받은 경우

        return "unfriend";
    }

}
