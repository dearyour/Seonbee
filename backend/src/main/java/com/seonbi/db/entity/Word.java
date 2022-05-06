package com.seonbi.db.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@Table(indexes = @Index(name="i_subject", columnList = "subject")) // subject 인덱스로 사용
public class Word extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordId; //기본키
    private String subject; // 주제어
    private String keyword; //연관어
    private Long amount; //건수
    private String category1 ; // 대분류?
    private String category2 ; // 소분류

}
