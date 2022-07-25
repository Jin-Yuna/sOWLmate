package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.Interest;
import com.ssafy.sowlmate.entity.InterestType;
import com.ssafy.sowlmate.service.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("interest")
@RequiredArgsConstructor
public class InterestController {

    private final InterestService interestService;

    /**
     * 관심사 전체 조회
     */
    @GetMapping("list")
    public List<Interest> interestList() {
        return interestService.selectAll();
    }

    /**
     * 유저별 관심사 등록
     */
    @PostMapping("{userId}")
    public Interest enrollInterest(@PathVariable String userId, Interest interest) {
        return interestService.enrollInterest(userId, interest);
    }

    /**
     * 유저별 관심사 삭제
     */
    @DeleteMapping("{userId}")
    public void deleteInterest(@PathVariable String userId, InterestType title) {
        interestService.deleteInterest(userId, title);
    }
}
