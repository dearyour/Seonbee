package com.seonbi.db.repository;


import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface WishlistRepository extends JpaRepository<Wishlist,Long> {

    List<Wishlist> findAllByMemberIdAndIsDeleted(Long memberId, boolean isDeleted);
    Wishlist findByWishlistIdAndIsDeleted(Long wishlistId, boolean isDeleted);
    Boolean existsWishlistByMemberIdAndProductIdAndIsDeleted(Long memberId, Long productId, boolean isDeleted);
}
