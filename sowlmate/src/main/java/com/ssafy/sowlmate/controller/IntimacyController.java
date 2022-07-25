package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.Intimacy;
import com.ssafy.sowlmate.service.IntimacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("intimacy")
public class IntimacyController {

    private final IntimacyService intimacyService;

    /**
     * 등록
     */
    @PostMapping
    public Intimacy enrollIntimacy(String fromUserId, String toUserId, int eval) {
        return intimacyService.enrollIntimacy(fromUserId, toUserId, eval);
    }

    /**
     * 전체 조회
     */
    @GetMapping("list")
    public List<Intimacy> getIntimacies() {
        return intimacyService.selectAll();
    }

    /**
     * 유저별 조회
     */
    @GetMapping("{userId}")
    public List<Intimacy> getIntimaciesByFromUser(@PathVariable String userId) {
        return intimacyService.selectAllByFromUserId(userId);
    }

    /**
     * 단일 조회
     */
    @GetMapping("single")
    public Intimacy getIntimacy(String fromUserId, String toUserId) {
        return intimacyService.selectByFromUserIdAndToUserId(fromUserId, toUserId);
    }

    /**
     * 긍정 평가
     */
    @PutMapping("positive")
    public int evalPositive(String fromUserId, String toUserId, int amount) {
        return intimacyService.evalPositive(fromUserId, toUserId, amount);
    }

    /**
     * 부정 평가
     */
    @PutMapping("negative")
    public int evalNegative(String fromUserId, String toUserId, int amount) {
        return intimacyService.evalNegative(fromUserId, toUserId, amount);
    }
}
