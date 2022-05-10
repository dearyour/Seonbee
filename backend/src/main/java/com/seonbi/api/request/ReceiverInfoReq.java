package com.seonbi.api.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReceiverInfoReq {

    Integer age;
    String name;
    Long price;
    String gender;
    String mbti;
    String interest;
    String relation;
    String purpose;
}
