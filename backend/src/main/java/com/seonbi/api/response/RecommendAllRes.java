package com.seonbi.api.response;

import com.seonbi.api.model.RecommendDto;
import com.seonbi.api.model.RecommendReceiverDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecommendAllRes extends BaseResponseBody{

    private List<RecommendDto> recommendList;

    public static RecommendAllRes of(Integer status, String message, List<RecommendDto> recommendList) {
        RecommendAllRes res = new RecommendAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setRecommendList(recommendList);

        return res;
    }

}
