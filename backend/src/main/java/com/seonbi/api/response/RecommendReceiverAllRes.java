package com.seonbi.api.response;

import com.seonbi.api.model.FriendCalendarDto;
import com.seonbi.api.model.RecommendReceiverDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecommendReceiverAllRes extends BaseResponseBody{

    private RecommendReceiverDto receiverList;

    public static RecommendReceiverAllRes of(Integer status, String message, RecommendReceiverDto receiverList) {
        RecommendReceiverAllRes res = new RecommendReceiverAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setReceiverList(receiverList);

        return res;
    }

}
