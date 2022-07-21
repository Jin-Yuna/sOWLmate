//package com.ssafy.sowlmate.controller;
//
//import com.ssafy.sowlmate.entity.Interest;
//import com.ssafy.sowlmate.service.InterestService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("interest")
//@RequiredArgsConstructor
//public class InterestController {
//
//    private final InterestService interestService;
//
//    /**
//     * 관심사 목록 반환
//     */
//    @GetMapping("list")
//    public List<Interest> getInterests() {
//        return interestService.selectAll();
//    }
//
//    /**
//     * 관심사 단일 조회
//     */
//    @GetMapping("{title}")
//    public Interest getInterest(@PathVariable String title) {
//        return interestService.selectByTitle(title);
//    }
//
//    /**
//     * 관심사 생성
//     */
//    @PostMapping("enroll")
//    public String enrollInterest(Interest interest) {
//        Long interestId = interestService.enrollOne(interest);
//        return interestId != null ? "success" : "failed";
//    }
//
//    /**
//     * 관심사 수정
//     */
//    @PutMapping("{title}")
//    public ResponseEntity<Interest> modifyInterest(@PathVariable String title, @RequestBody Interest interest) {
//        return ResponseEntity.ok().body(interestService.updateInterest(title, interest));
//    }
//
//    /**
//     * 관심사 삭제
//     */
//    @DeleteMapping("{title}")
//    public String deleteInterest(String title) {
//        int deletedCount = interestService.deleteByTitle(title);
//        return deletedCount > 0 ? "success" : "failed";
//    }
//}
