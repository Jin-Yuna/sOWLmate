//package com.ssafy.sowlmate.service;
//
//import com.ssafy.sowlmate.entity.Interest;
//import com.ssafy.sowlmate.entity.User;
//import com.ssafy.sowlmate.entity.UserInterest;
//import com.ssafy.sowlmate.entity.UserLanStatus;
//import com.ssafy.sowlmate.repository.UserRepository;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.Assert.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@Transactional
//public class UserInterestServiceTest {
//
//    @Autowired UserRepository userRepository;
////    @Autowired InterestRepository interestRepository;
//
//    @Test
//    public void 유저별관심사등록테스트() {
//        // given
//        User user = new User();
//        user.setId("user1");
//        user.setPassword("1234");
//        user.setNickname("user1");
//        user.setRegion("KOREA");
//        user.setLanguage(UserLanStatus.KOREAN);
//        userRepository.save(user);
//
//        // when
////        User findUser = userRepository.findById("user1");
////        Interest findInterest = interestRepository.findByTitle("food");
////
////        System.out.println(findUser.toString());
////        System.out.println(findInterest.toString());
//
//        // then
//
//    }
//}