//package com.ssafy.sowlmate.service;
//
//import com.ssafy.sowlmate.entity.Interest;
//import com.ssafy.sowlmate.repository.InterestRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Service
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
//public class InterestService {
//
//    private final InterestRepository interestRepository;
//
//    public List<Interest> selectAll() {
//        return interestRepository.findAll();
//    }
//
//    public Interest selectByTitle(String title) {
//        return interestRepository.findByTitle(title);
//    }
//
//    @Transactional
//    public Long enrollOne(Interest interest) {
//        return interestRepository.save(interest).getNo();
//    }
//
//    @Transactional
//    public int deleteByTitle(String title) {
//        return interestRepository.deleteByTitle(title);
//    }
//
////    @Transactional
////    public Interest updateInterest(String title, Interest interest) {
////        Interest findedInterest = interestRepository.findByTitle(title);
////
////        findedInterest.setContent(interest.getContent());
////
////        interestRepository.save(findedInterest);
////
////        return findedInterest;
////    }
//}
