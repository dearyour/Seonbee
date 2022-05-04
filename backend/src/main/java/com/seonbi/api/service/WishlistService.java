package com.seonbi.api.service;

import com.seonbi.api.model.WishlistDto;
import com.seonbi.db.entity.Wishlist;

import java.util.List;

public interface WishlistService {
    List<WishlistDto> getWishlist(Long hostId);
}
