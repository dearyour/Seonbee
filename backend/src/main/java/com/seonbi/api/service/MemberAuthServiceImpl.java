package com.seonbi.api.service;

import com.seonbi.auth.SeonbiUserDetail;
import com.seonbi.db.entity.Member;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class MemberAuthServiceImpl implements MemberAuthService{

    @Override
    public Member memberAuthorize(Authentication authentication) {
        SeonbiUserDetail details = (SeonbiUserDetail) authentication.getDetails();
        if (details==null)  return null;
        return details.getMember();
    }
}
