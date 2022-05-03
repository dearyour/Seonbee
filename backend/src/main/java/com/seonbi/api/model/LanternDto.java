package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class LanternDto {
    /**
     * 호패 - 연등 1개
     */
    private Long lanternId;
    private Long guestId;
    private String nickname;
    private String content;
    private int position=1;
    private int lanternType=1;
}
