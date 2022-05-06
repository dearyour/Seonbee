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
public class ReceiverProductDto {
    /**
     * 사랑방 - 벗 목록 디데이순
     */
    private String name;
    List<ReceiverProductDto> productList;
}
