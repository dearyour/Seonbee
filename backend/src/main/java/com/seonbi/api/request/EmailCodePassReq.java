package com.seonbi.api.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmailCodePassReq {
    private String email;
    private String code;
    private String password;

}
