package com.seonbi.api.service;



import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;




    @Override
    public Member getMemberByMemberNickname(String nickname) {
        return memberRepository.findByNickname(nickname);
    }

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    public void register(Member member) {

        System.out.println("등록 서비스");
        memberRepository.save(member);
    }

    @Override
    public String kakaoToken(String code) {
        String restapiKey="946bfa1b0c2ba70a70f6070dba9642d3";
        String access_Token= "";
        String refresh_Token="";
        String requestURL="https://kauth.kakao.com/oauth/token";
        String redirectURI="http://localhost:8080/kakao";

        try {
            URL url=new URL(requestURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb=new StringBuilder();

            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+restapiKey);
            sb.append("&redirect_uri="+redirectURI);
            sb.append("&code="+code);
            bw.write(sb.toString());
            bw.flush();


            BufferedReader br=new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line="";
            String result="";

            while((line=br.readLine())!=null)
            {
                result+=line;
            }
            System.out.println("응답값이 잘 넘어오는가?");
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject element = (JSONObject) parser.parse(result);

            access_Token = element.get("access_token").toString();
            refresh_Token= element.get("refresh_token").toString();


            br.close();
            bw.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("access_token="+access_Token);
        System.out.println("refresh_token="+refresh_Token);
        return access_Token;

    }

    @Override
    public Map<String, String> getKakaoUserInfo(String accessToken) {

        String requestURL="https://kapi.kakao.com/v2/user/me";
        Map<String, String> response = new HashMap<>();

        try {
            URL url=new URL(requestURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            bw.flush();


            BufferedReader br=new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line="";
            String result="";

            while((line=br.readLine())!=null)
            {
                result+=line;
            }

            System.out.println("--------------사용자 정보-----------------------");
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject element = (JSONObject) parser.parse(result);
            JSONObject kakao_account = (JSONObject) element.get("kakao_account");

            boolean hasEmail = (boolean) kakao_account.get("has_email");
            String email="";

            if(hasEmail) {
                email = kakao_account.get("email").toString();
            }

            response.put("email",email);

            System.out.println("받아온 이메일 정보="+email);

            br.close();
            bw.close();


        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }


}