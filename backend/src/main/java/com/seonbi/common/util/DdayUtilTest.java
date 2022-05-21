package com.seonbi.common.util;

import java.util.Random;

public class DdayUtilTest {
    public static void main(String[] args) {
        System.out.println(DdayUtil.Dday("2022.05.02"));
        System.out.println(DdayUtil.Dday("2022.05.03"));
        System.out.println(DdayUtil.Dday("2022.05.04"));
        System.out.println(DdayUtil.Dday("2022.05.05"));
        System.out.println(DdayUtil.Dday("2022.04.05"));
        System.out.println(DdayUtil.Dday("2023.04.05"));


        Long a=1000l;
        Long b=1000l;
        System.out.println(a==b);
        System.out.println(a.equals(b));

        Long c=0l;
        Long d=0l;
        System.out.println(c==d);
        System.out.println(c.equals(d));
        System.out.println(DdayUtil.Date("2022-02-07T22:28:38.203031"));

        Random random=new Random();
//        for (int i=0; i<100; i++){
//            System.out.println(random.nextInt(8));
//        }

    }
}
