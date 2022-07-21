//package com.ssafy.sowlmate.service;
//
//import com.ssafy.sowlmate.entity.Interest;
//import com.ssafy.sowlmate.entity.InterestItem;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.junit.Assert.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@Transactional
//public class InterestServiceTest {
//
//    @Autowired
//    InterestService interestService;
//
//    @Test
//    public void 관심사등록() {
//        // given
//        InterestItem interestItem = new InterestItem();
//        interestItem.setTitle("food");
//        interestItem.setContent("kimchis...");
//
//        Interest interest = new Interest();
//        interest.setInterestItem(interestItem);
//
//        // when
//        Long interestId = interestService.enrollOne(interest);
//
//        // then
//        System.out.println(interestId);
//    }
////}