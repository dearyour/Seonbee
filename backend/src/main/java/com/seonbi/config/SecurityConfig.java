package com.seonbi.config;

import com.seonbi.auth.JwtAuthenticationFilter;
import com.seonbi.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public MemberRepository memberRepository;


    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /*
        왜 disable 처리를 했는가?
        -> 스프링 시큐리티를 적용하면 기본적으로 csrf 토큰이 있는지 확인하고 없으면 막아버린다
        프론트에서 요청을 보낼때 form을 통해서 요청하는게 아니라 자바스크립트(axios)를 통해 요청을 보내게 되고
        자바스크립트를 통한 요청은 csrf토큰이 없기때문에 막아진다
         */
        http.csrf().disable()
                .httpBasic().disable()     // http는 암호화가 안됨 -> bearer token으로 사용
                .cors().configurationSource(corsConfigurationSource()) // cors 허용 정책 bean등록
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), memberRepository))  //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .authorizeRequests()    // HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정
//                .antMatchers("api/image/**").permitAll()
                .antMatchers("/api/member/auth").authenticated()    // 인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
//                .antMatchers("/api/member/auth").hasAnyAuthority("ROLE_USER")   // 인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                .anyRequest().permitAll(); //이외의 다른 요청들을 다 허용
}

    //cors허용 정책 설정하는 Bean
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration=new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000"); // 허용할 url   왜 * 로 하면 에러..?
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*"); // 허용할 Header
        configuration.addAllowedMethod("*"); // 허용할 http Method;
        configuration.setAllowCredentials(true); //뭔지 모르겠다...

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }
}


