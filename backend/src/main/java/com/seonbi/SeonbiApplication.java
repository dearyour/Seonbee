package com.seonbi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SeonbiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeonbiApplication.class, args);
    }

}
