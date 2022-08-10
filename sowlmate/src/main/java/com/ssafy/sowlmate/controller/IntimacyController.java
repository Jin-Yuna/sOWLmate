package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.request.IntimacyRequestDto;
import com.ssafy.sowlmate.service.IntimacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("intimacy")
public class IntimacyController {

    private final IntimacyService intimacyService;

    /**
     * 등록
     */
    @PostMapping
    public ResponseEntity<?> enrollIntimacy(@RequestBody IntimacyRequestDto requestDto) {
        return ResponseEntity.ok().body(intimacyService.enrollIntimacy(requestDto));
    }

    /**
     * 전체 조회
     */
    @GetMapping("list")
    public ResponseEntity<?> getIntimacies() {
        return ResponseEntity.ok().body(intimacyService.selectAll());
    }

    /**
     * 유저별 조회
     */
    @GetMapping("list/user")
    public ResponseEntity<?> getIntimaciesByFromUser(HttpServletRequest request) {
        return ResponseEntity.ok().body(intimacyService.selectAllByFromUserId(request.getHeader("fromUserId")));
    }

    /**
     * 단일 조회
     */
    @GetMapping("single")
    public ResponseEntity<?> getIntimacy(HttpServletRequest request) {
        return ResponseEntity.ok().body(intimacyService.selectByFromUserIdAndToUserId2(request.getHeader("fromUserId"), request.getHeader("toUserId")));
    }

    /**
     * 긍정 평가
     */
    @PutMapping("positive")
    public ResponseEntity<?> evalPositive(@RequestBody IntimacyRequestDto requestDto) {
        return ResponseEntity.ok().body(intimacyService.evalPositive(requestDto));
    }

    /**
     * 부정 평가
     */
    @PutMapping("negative")
    public ResponseEntity<?> evalNegative(@RequestBody IntimacyRequestDto requestDto) {
        return ResponseEntity.ok().body(intimacyService.evalNegative(requestDto));
    }
}
