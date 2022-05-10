package com.seonbi.db.repository;

import com.seonbi.db.entity.EmailCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<EmailCode, Long> {
    EmailCode findByEmailAndCodeAndTagAndIsDeleted(String email, String code, String tag, boolean isDeleted);
}
