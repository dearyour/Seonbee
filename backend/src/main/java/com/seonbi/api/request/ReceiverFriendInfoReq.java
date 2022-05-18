package com.seonbi.api.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReceiverFriendInfoReq {

    Long price=50000l;
    Long friendId;
}
