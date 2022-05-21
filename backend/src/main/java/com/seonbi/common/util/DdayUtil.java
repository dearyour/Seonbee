package com.seonbi.common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DdayUtil {

    public static String Dday(String dateString){
        // 마감일 계산
        Calendar todayDate = Calendar.getInstance();
        todayDate.setTime(new Date()); //금일 날짜
        Date endDate = null;
        try {
            endDate = new SimpleDateFormat("yyyy.MM.dd").parse(dateString);
            Calendar cmpDate = Calendar.getInstance();
            cmpDate.setTime(endDate); //특정 일자

            double deadline = (todayDate.getTimeInMillis() - cmpDate.getTimeInMillis()) / (24*60*60*1000.0);
            if (deadline>=0 && deadline<1){
                return "D-day";
            } else if (deadline>7){
                return null;
            } else if (deadline<-358){
                return null;
            } else if (deadline<0){
                return "D"+(long)(deadline-1);
            } else {
                return "D+"+(long)deadline;
            }
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String Date(String fullDate) {
        String[] splits = fullDate.split("T");
        return splits[0].replace('-', '.');
    }

}
