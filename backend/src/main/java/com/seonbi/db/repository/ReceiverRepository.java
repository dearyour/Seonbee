package com.seonbi.db.repository;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReceiverRepository extends JpaRepository<Receiver,Long> {

    Receiver findByReceiverIdAndIsDeleted(Long receiverId, boolean isDeleted);
}
