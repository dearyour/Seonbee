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
        int backgroundSize=8;     // ???????????? 0~7
        // ?????? ????????? ??????
        if (member.getBirthday() != null) {
            String[] birthday = member.getBirthday().split("\\.");
            if (birthday.length == 3) {
                Schedule schedule = new Schedule();
                schedule.setMemberId(newMember.getMemberId());
                schedule.setTitle("??????");
                schedule.setBirthday(true);
                schedule.setScheduleDate("2022." + birthday[1] + "." + birthday[2]);
                schedule.setBackground(random.nextInt(backgroundSize));
                scheduleRepository.save(schedule);
            }
        }

        // ????????? ????????? ??????
        Schedule schedule = new Schedule();
        schedule.setMemberId(newMember.getMemberId());
        schedule.setTitle("?????????");
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
                // ?????? ???????????? ??????
                Schedule schedule=scheduleRepository.findByMemberIdAndIsBirthdayAndIsDeleted(member.getMemberId(), true, false);
                if (schedule==null)   schedule = new Schedule();  // ?????? ????????? ????????? ????????? ?????? ??????
                schedule.setMemberId(member.getMemberId());
                schedule.setTitle("??????");
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
        if (!emailMatcher.find())   return 401; // ????????? ??????
        if (memberRepository.findByEmailAndIsDeleted(email, false)!=null)    return 402;    // ?????? ??????

        return 200;
    }

    @Override
    public int passwordCheck(String password) {
        if (password == null)    return 401;
        // ???????????? ?????? ??????(??????, ???????????? 8~16??????)
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
        if (!passwordEncoder.matches(password, member.getPassword()))    return 402;     // ???????????? ??????
        return 200;
    }

    @Override
    public int nicknameCheckExceptMe(String nickname, String curNickname) {
        if (nickname.length() < 2 || nickname.length() > 12)    return 401;
        Member member = memberRepository.findByNicknameAndIsDeleted(nickname, false);
        if (member == null || curNickname.equals(member.getNickname()))    return 200;    // ????????? ????????? ????????? ????????? ??????
        return 402;     // ????????? ??????
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
            if (memberId.equals(member.getMemberId()))  continue;   // ?????? ??????
            MemberSearchDto memberSearchDto = modelMapper.map(member, MemberSearchDto.class);
            String friendStatus=friendService.getFriendStatus(memberId, member.getMemberId());
            if ("requested".equals(friendStatus))    friendStatus="unfriend";   // ?????? ?????? ??????
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
//        String redirectURI="http://localhost:3000/auth/kakao/callback"; // ?????????
//        String redirectURI="https://k6a406.p.ssafy.io/auth/kakao/callback"; // ?????????
        String redirectURI="https://seonbee.com/auth/kakao/callback"; // ????????? ????????? ??????


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
            System.out.println("???????????? ??? ????????????????");
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

            System.out.println("--------------????????? ??????-----------------------");
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

                birthday= "1995."+birthday; // ????????? ???????????? 1995
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
            System.out.println("????????? ????????? ??????=" + nickname);
            System.out.println("????????? ????????? ??????=" + email);
            System.out.println("????????? ?????? ??????=" + gender);
            System.out.println("????????? ????????? ??????=" + image);
            System.out.println("????????? ???????????? =" + birthday);

            br.close();
            bw.close();


        } catch (Exception e) {
            e.printStackTrace();
        }


        if (email != null) //????????? ??????????????? ???????????? ?????????
        {
            //?????? ????????? ???????????? ??????
            Member member = memberRepository.findByEmailAndIsDeletedAndIsKakao(email, false, true);


            //????????? ????????? ?????? ????????? ????????? ????????? ??????

            if (member == null) // ?????? ??? ???????????? db??? ??????
            {


                //????????? ???????????? ???  ??????????????? ????????????
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


                System.out.println("----------?????????-------");
                System.out.println(member.getMemberId());
            }

            token = JwtTokenProvider.getToken(email,true);
            System.out.println("access token=" + token);


        }

        return token;
    }


}