package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class RecommendReceiverDto {
    /**
     * 호패 - 주고싶소 목록
     */

    private List<ReceiverDto> noneMemberList;
    private List<ReceiverDto> memberList;

    public RecommendReceiverDto(List<ReceiverDto> noneMemberList, List<ReceiverDto> memberList) {
        this.noneMemberList = noneMemberList;
        this.memberList = memberList;
    }
}
