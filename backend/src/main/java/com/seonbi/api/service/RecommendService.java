package com.seonbi.api.service;

import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendDto;
import com.seonbi.api.model.RecommendReceiverDto;

import java.util.List;

public interface RecommendService {

    RecommendReceiverDto getGiveAll(Long memberId);
    List<ReceiverProductDto> getGiveProductAll(Long memberId, Long receiverId, Boolean isMember);
    int addGiveProduct(Long memberId, Long friendId, Long productId);
    List<RecommendDto> getRecommendAll(Long memberId);
    int saveRecommendGive(Long memberId, Long recommendId);
}
