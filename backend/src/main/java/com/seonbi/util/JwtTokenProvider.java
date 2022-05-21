package com.seonbi.util;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;


/*
토큰 생성
 */

@Component
public class JwtTokenProvider {

    private static String secretKey = "c2VvbmJp7J206rOgIOyLtuyngOunjCBzZW9uYmVl6rCAIOuPvOuyhOuguOuEpOyalOOFoOOFoA==";  //시크릿 키
    private static Integer expirationTime = 30 * 60 * 10000;  // access 유효시간 (30분) > 개발 용으로 10배로 늘림

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "seonbi.com";


    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }


    public static String getToken(String userEmail, boolean isKakao) {
        Date expires = JwtTokenProvider.getTokenExpiration(expirationTime);

        return JWT.create()
//                .withClaim("role", role)  //payload에 추가하기
                .withSubject(userEmail)  //기본키 ( 이메일 )  중복이 안되니까..?
                .withClaim("isKakao",isKakao) // 카카오 로그인이면 true 일반 로그인이면 false
                .withExpiresAt(expires)  // 만료 시간
                .withIssuer(ISSUER) // 발행자
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())) // 발행 시간
                .sign(Algorithm.HMAC512(secretKey.getBytes())); // 암호화 알고리즘  HMAC512 사용
    }


    //만료시간 계산해서 반환
    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);  // 현재시간  + 30분
    }


    // 발행된 토큰 검증
    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {  //
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}


