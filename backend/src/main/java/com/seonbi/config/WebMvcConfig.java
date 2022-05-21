package com.seonbi.config;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration;
import org.springframework.context.annotation.Bean;

public class WebMvcConfig {

//    @Bean
//    public static BeanFactoryPostProcessor beanFactoryPostProcessor() {
//        return beanFactory -> {
//            BeanDefinition bean =
//                    beanFactory.getBeanDefinition(DispatcherServletAutoConfiguration.DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME);
//            bean.getPropertyValues().add("loadOnStartup", 1);
//        };
//    }

}
