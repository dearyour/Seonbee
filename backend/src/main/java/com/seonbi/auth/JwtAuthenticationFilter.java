package com.seonbi.auth;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.seonbi.api.service.MemberService;
import com.seonbi.db.entity.Member;
import com.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;



/*
시큐리티가 filter 를 가지고 있는데 그 필터중에 BasicAuthenticationFilter 가 있다

권한이나 인증이 필요한 특정 주소를 요청했을때 이 필터를 무조건 타게 된다
만약 권한이나 인증이 필요한 주소가 아니라면 이 필터를 안탄다


 */

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {


    private MemberService memberService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, MemberService memberService) {
        super(authenticationManager);
        this.memberService = memberService;
    }


    // 인증이나 권한이 필요한 주소요청이 있을때 해당 필터를 타게 될것
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // super.doFilterInternal(request, response, chain);

        //Request의 Header에서 token값을 가져온다
        String token = request.getHeader("Authorization");


        System.out.println("token=" + token);
        // 비어있거나  Bearer로 시작하지 않는다면?
        if (token == null || !token.startsWith("Bearer ")) {

            System.out.println("비어있거나 Bearer로 시작하지 않는다");
            chain.doFilter(request, response);
            return;
        }

        JWTVerifier verifier = JwtTokenProvider.getVerifier();

        //토큰 검증
        JwtTokenProvider.handleError(token);

        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenProvider.TOKEN_PREFIX, ""));
        String email = decodedJWT.getSubject();


        // 디코딩한 jwt로부터  토큰 subject(email)을 받았으면 db로 해당 이메일을 가진 멤버가 있는지 조회한다

        if (email != null) {
            System.out.println("토큰의 이메일  저장되어 있다");

            Member member = null;
            String role = "ROLE_USER"; // 필요한가?


            member = memberService.getMemberByEmail(email); // 해당 이메일을 가진 유저가 db에 존재하는지 조회


            // db에 존재한다면?
            if (member != null) {
                System.out.println("이메일이 db에 저장되어 있다");
                SeonbiUserDetail seonbiUserDetail = new SeonbiUserDetail(member);
                seonbiUserDetail.setAuthorities((Arrays.asList(new SimpleGrantedAuthority(role))));

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(seonbiUserDetail, null, seonbiUserDetail.getAuthorities());
                authentication.setDetails(seonbiUserDetail);
                // 시큐리티 세션에 접근하여 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("시큐리티 세션에 접근하여 저장");
                chain.doFilter(request, response);
                return;
            }


        }
        chain.doFilter(request, response);

    }
}