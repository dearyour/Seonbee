package com.seonbi.api.response;

import com.seonbi.api.model.FriendDto;
import com.seonbi.api.model.WishlistDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WishlistAllRes extends BaseResponseBody{

    private List<WishlistDto> wishes;

    public static WishlistAllRes of(Integer status, String message, List<WishlistDto> wishes) {
        WishlistAllRes res = new WishlistAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setWishes(wishes);

        return res;
    }

}
