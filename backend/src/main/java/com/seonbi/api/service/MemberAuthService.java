package com.seonbi.api.service;

import com.seonbi.db.entity.Member;
import org.springframework.security.core.Authentication;

public interface MemberAuthService {

    Member memberAuthorize(Authentication authentication);
}
