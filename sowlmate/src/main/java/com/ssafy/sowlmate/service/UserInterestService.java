//package com.ssafy.sowlmate.service;
//
//import com.ssafy.sowlmate.entity.Interest;
//import com.ssafy.sowlmate.entity.User;
//import com.ssafy.sowlmate.entity.UserInterest;
//import com.ssafy.sowlmate.repository.InterestRepository;
//import com.ssafy.sowlmate.repository.UserInterestRepository;
//import com.ssafy.sowlmate.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//@Transactional(readOnly = true)
//public class UserInterestService {
//
//    private final UserRepository userRepository;
//    private final InterestRepository interestRepository;
//    private final UserInterestRepository userInterestRepository;
//
//    public List<UserInterest> selectAll() {
//        return userInterestRepository.findAll();
//    }
//
////    @Transactional
////    public UserInterest enrollUserInterest(String userId, String interestTitle) {
////        User findUser = userRepository.findById(userId);
////        Interest findInterest = interestRepository.findByTitle(interestTitle);
////
////        UserInterest userInterest = UserInterest.createUserInterest(findUser, findInterest);
////
////        return userInterestRepository.save(userInterest);
////    }
//
//}
//
