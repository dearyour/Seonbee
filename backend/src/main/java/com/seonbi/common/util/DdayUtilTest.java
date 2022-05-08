package com.seonbi.common.util;

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

    }
}
