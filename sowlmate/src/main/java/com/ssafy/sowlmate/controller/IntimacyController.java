package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.IntimacyRequestDto;
import com.ssafy.sowlmate.service.IntimacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getIntimaciesByFromUser(@RequestBody IntimacyRequestDto requestDto) {
        return ResponseEntity.ok().body(intimacyService.selectAllByFromUserId(requestDto.getFromUserId()));
    }

    /**
     * 단일 조회
     */
    @GetMapping("single")
    public ResponseEntity<?> getIntimacy(@RequestBody IntimacyRequestDto requestDto) {
        return ResponseEntity.ok().body(intimacyService.selectByFromUserIdAndToUserId(requestDto));
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
