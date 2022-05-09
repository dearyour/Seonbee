package com.seonbi.db.repository;

import com.seonbi.db.entity.Wishlist;
import com.seonbi.db.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository  extends JpaRepository<Word,Long> {
}
