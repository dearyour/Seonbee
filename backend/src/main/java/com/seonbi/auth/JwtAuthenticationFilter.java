package com.seonbi.auth;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.seonbi.api.service.MemberService;
import com.seonbi.db.entity.Member;
import com.seonbi.db.repository.MemberRepository;
import com.seonbi.util.JwtTokenProvider;
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


    private MemberRepository memberRepository;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
    }

    // 인증이나 권한이 필요한 주소요청이 있을때 해당 필터를 타게 될것
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // super.doFilterInternal(request, response, chain);
        //Request의 Header에서 token값을 가져온다
        String token = request.getHeader("Authorization");

//        System.out.println("token=" + token);
        // 비어있거나  Bearer로 시작하지 않는다면?
        if (token == null || !token.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        JWTVerifier verifier = JwtTokenProvider.getVerifier();
        //토큰 검증
        JwtTokenProvider.handleError(token);
        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenProvider.TOKEN_PREFIX, ""));
        String email = decodedJWT.getSubject();
        boolean isKakao = decodedJWT.getClaim("isKakao").asBoolean();


        System.out.println("isKakao= "+isKakao);

        // 디코딩한 jwt로부터  토큰 subject(email)을 받았으면 db로 해당 이메일을 가진 멤버가 있는지 조회한다
        if (email == null) {
            chain.doFilter(request, response);
            return;
        }
        Member member= memberRepository.findByEmailAndIsDeletedAndIsKakao(email,false,isKakao); // 해당 이메일을 가진 유저가 db에 존재하는지 조회 (kakao 도 확인)
        System.out.println("member="+member);
        if (member == null) {
            chain.doFilter(request, response);
            return;
        }
        SeonbiUserDetail seonbiUserDetail = new SeonbiUserDetail(member);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(seonbiUserDetail, null, seonbiUserDetail.getAuthorities());
        // 시큐리티 세션에 접근하여 Authentication 객체를 저장
        authentication.setDetails(seonbiUserDetail);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
        return;
    }
}