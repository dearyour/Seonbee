package com.seonbi.api.service;

import com.seonbi.api.model.MemberSearchDto;
import com.seonbi.common.util.DdayUtil;
import com.seonbi.db.entity.Schedule;
import com.seonbi.db.repository.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.seonbi.api.model.MemberDto;
import com.seonbi.api.request.MemberLoginReq;
import com.seonbi.db.entity.Member;
import com.seonbi.util.JwtTokenProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ImageService imageService;

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    FriendService friendService;

    @Autowired
    ScheduleRepository scheduleRepository;


    @Override
    public MemberDto getMemberByNickname(String nickname) {
        Member member=memberRepository.findByNicknameAndIsDeleted(nickname, false);
        if (member==null)   return null;
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public MemberDto getMemberByEmail(String email) {
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null)   return null;
        return modelMapper.map(member, MemberDto.class);
    }

    @Override
    public MemberDto getMemberByMemberId(Long memberId) {
        Member member = memberRepository.findByMemberIdAndIsDeleted(memberId, false);
        if (member==null)   return null;
        MemberDto memberDto = modelMapper.map(member, MemberDto.class);
        memberDto.setImageString(imageService.getImage(member.getImageId()));
        return memberDto;
    }

    @Override
    public Member createMember(Member member) {
        Member newMember = memberRepository.save(member);
        Random random=new Random();
        int backgroundSize=8;     // 배경번호 0~7
        // 생일 일정에 추가
        if (member.getBirthday() != null) {
            String[] birthday = member.getBirthday().split("\\.");
            if (birthday.length == 3) {
                Schedule schedule = new Schedule();
                schedule.setMemberId(newMember.getMemberId());
                schedule.setTitle("생일");
                schedule.setBirthday(true);
                schedule.setScheduleDate("2022." + birthday[1] + "." + birthday[2]);
                schedule.setBackground(random.nextInt(backgroundSize));
                scheduleRepository.save(schedule);
            }
        }

        // 생성일 일정에 추가
        Schedule schedule = new Schedule();
        schedule.setMemberId(newMember.getMemberId());
        schedule.setTitle("가입일");
        schedule.setScheduleDate(DdayUtil.Date(member.getCreatedDate().toString()));
        schedule.setBackground(random.nextInt(backgroundSize));
        scheduleRepository.save(schedule);

        return newMember;
    }

    @Override
    public void updateMember(Member member) {
        if (member.getBirthday() != null) {
            String[] birthday=member.getBirthday().split("\\.");
            if (birthday.length == 3) {
                // 생일 일정에서 변경
                Schedule schedule=scheduleRepository.findByMemberIdAndIsBirthdayAndIsDeleted(member.getMemberId(), true, false);
                if (schedule==null)   schedule = new Schedule();  // 기존 등록된 생일이 없으면 새로 생성
                schedule.setMemberId(member.getMemberId());
                schedule.setTitle("생일");
                schedule.setBirthday(true);
                schedule.setScheduleDate("2022." + birthday[1] + "." + birthday[2]);
                schedule.setBackground(1);
                scheduleRepository.save(schedule);
            }
        }

        memberRepository.save(member);
    }

    @Override
    public int emailCheck(String email) {
        if (email==null)  return 401;
        Pattern emailPattern = Pattern.compile("^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+\\.[a-zA-Z]{2,6}$");
        Matcher emailMatcher = emailPattern.matcher(email);
        if (!emailMatcher.find())   return 401; // 유효성 검사
        if (memberRepository.findByEmailAndIsDeleted(email, false)!=null)    return 402;    // 중복 검사

        return 200;
    }

    @Override
    public int passwordCheck(String password) {
        if (password == null)    return 401;
        // 비밀번호 포맷 확인(영문, 숫자포함 8~16자리)
        Pattern passPattern = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d).{8,16}$");
        Matcher passMatcher = passPattern.matcher(password);
        if (!passMatcher.find())    return 401;
        return 200;
    }

    @Override
    public int nicknameCheck(String nickname) {
        if (nickname.length()<2 || nickname.length()>12)    return 401;
        if (memberRepository.existsByNicknameAndIsDeleted(nickname, false))    return 402;
        return 200;
    }

    @Override
    public int loginCheck(MemberLoginReq memberLoginReq) {
        String email = memberLoginReq.getEmail();
        String password = memberLoginReq.getPassword();
        Member member = memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null)    return 401;
        if (!passwordEncoder.matches(password, member.getPassword()))    return 402;     // 비밀번호 다름
        return 200;
    }

    @Override
    public int nicknameCheckExceptMe(String nickname, String curNickname) {
        if (nickname.length() < 2 || nickname.length() > 12)    return 401;
        Member member = memberRepository.findByNicknameAndIsDeleted(nickname, false);
        if (member == null || curNickname.equals(member.getNickname()))    return 200;    // 닉네임 중복이 없거나 본인인 경우
        return 402;     // 닉네임 중복
    }

    @Override
    public void deleteMember(Long memberId) {
        memberRepositorySupport.deleteMember(memberId); // is_deleted=1
    }

    @Override
    public boolean isMemberValid(Long hostId) {
        return memberRepository.existsByMemberIdAndIsDeleted(hostId, false);
    }

    @Override
    public List<MemberSearchDto> searchByNickname(Long memberId, String nickname) {
        List<Member> members = memberRepository.findAllByNicknameContainsAndIsDeleted(nickname, false);
        List<MemberSearchDto> memberSearchDtos = new ArrayList<>();
        for (Member member : members) {
            if (memberId.equals(member.getMemberId()))  continue;   // 나는 제외
            MemberSearchDto memberSearchDto = modelMapper.map(member, MemberSearchDto.class);
            String friendStatus=friendService.getFriendStatus(memberId, member.getMemberId());
            if ("requested".equals(friendStatus))    friendStatus="unfriend";   // 아직 친구 아님
            memberSearchDto.setFriend(friendStatus);
            memberSearchDto.setImageString(imageService.getImage(member.getImageId()));
            memberSearchDtos.add(memberSearchDto);
        }
        return memberSearchDtos;
    }

    @Override
    public int updatePassword(String email, String password) {
        Member member=memberRepository.findByEmailAndIsDeleted(email, false);
        if (member==null)   return 401;
        member.setPassword(passwordEncoder.encode(password));
        memberRepository.save(member);
        return 200;
    }


    @Override
    public String kakaoToken(String code) {
        String restapiKey="92fc0696d48204014f31850bda9c7686";
        String access_Token= "";
        String refresh_Token="";
        String requestURL="https://kauth.kakao.com/oauth/token";
//        String redirectURI="http://localhost:3000/auth/kakao/callback"; // 로컬시
//        String redirectURI="https://k6a406.p.ssafy.io/auth/kakao/callback"; // 배포시
        String redirectURI="https://seonbee.com/auth/kakao/callback"; // 배포시 도메인 변경


        try {
            URL url = new URL(requestURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();

            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + restapiKey);
            sb.append("&redirect_uri=" + redirectURI);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();


            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("응답값이 잘 넘어오는가?");
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject element = (JSONObject) parser.parse(result);
            access_Token = element.get("access_token").toString();
            refresh_Token = element.get("refresh_token").toString();


            br.close();
            bw.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("access_token=" + access_Token);
        System.out.println("refresh_token=" + refresh_Token);
        return access_Token;

    }

    @Override
    public String getKakaoUserInfo(String accessToken) {

        String requestURL = "https://kapi.kakao.com/v2/user/me";
        Map<String, String> response = new HashMap<>();
        String email = null;
        String gender = null;
        String nickname = null;
        String token = null;
        String image = null;
        String birthday = null;
        try {
            URL url = new URL(requestURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            bw.flush();


            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            System.out.println("--------------사용자 정보-----------------------");
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject element = (JSONObject) parser.parse(result);
            JSONObject kakao_account = (JSONObject) element.get("kakao_account");
            JSONObject profile = (JSONObject) kakao_account.get("profile");


            nickname = profile.get("nickname").toString();
            image = profile.get("profile_image_url").toString();

            boolean hasEmail = (boolean) kakao_account.get("has_email");
            boolean hasGender = (boolean) kakao_account.get("has_gender");
            boolean hasBirthday = (boolean) kakao_account.get("has_birthday");

            if (hasEmail) {
                email = kakao_account.get("email").toString();
            }




            if (hasBirthday) {

                birthday = kakao_account.get("birthday").toString();

                birthday = birthday.substring(0, 2) + "." + birthday.substring(2, 4);

                birthday= "1995."+birthday; // 임의로 출생년도 1995
            }


            if (hasGender) {
                gender = kakao_account.get("gender").toString();

                if (gender.equals("male")) {
                    gender = "M";
                } else if (gender.equals("female")) {
                    gender = "F";
                }


            }

            nickname = null;

            if (nickname == null) {
                String[] array = email.split("@");
                nickname = array[0];
            }


            response.put("email", email);
            System.out.println("받아온 닉네임 정보=" + nickname);
            System.out.println("받아온 이메일 정보=" + email);
            System.out.println("받아온 성별 정보=" + gender);
            System.out.println("받아온 이미지 정보=" + image);
            System.out.println("받아온 생일정보 =" + birthday);

            br.close();
            bw.close();


        } catch (Exception e) {
            e.printStackTrace();
        }


        if (email != null) //카카오 유저정보로 이메일을 받아옴
        {
            //이미 가입된 회원인지 확인
            Member member = memberRepository.findByEmailAndIsDeletedAndIsKakao(email, false, true);


            //닉네임 있으면 저장 없으면 앞자리 짤라서 오기

            if (member == null) // 처음 온 유저라면 db에 저장
            {


                //닉네임 중복체크 후  중복이라면 난수생성
                String newNickname = nickname;
                while (true) {
                    Member m = memberRepository.findByNicknameAndIsDeleted(newNickname, false);

                    if (m == null) {
                        break;
                    }

                    String num = "";
                    Random random = new Random();

                    for (int i = 1; i <= 3; i++) {
                        String val = Integer.toString(random.nextInt(10));

                        if (!num.contains(val)) {
                            num += val;
                        } else {
                            i = i - 1;
                        }
                    }

                    newNickname = nickname + num;
                }


                member = new Member();
                member.setEmail(email);
                member.setIsKakao(true);
                member.setGender(gender);
                member.setNickname(newNickname);
                member.setBirthday(birthday);
                memberRepository.save(member);


                System.out.println("----------기본키-------");
                System.out.println(member.getMemberId());
            }

            token = JwtTokenProvider.getToken(email,true);
            System.out.println("access token=" + token);


        }

        return token;
    }


}