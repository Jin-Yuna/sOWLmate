package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.FromToUserIdDto;
import com.ssafy.sowlmate.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("blacklist")
public class BlackListController {

    private final BlackListService blackListService;

    /**
     * 차단 계정 생성
     */
    @PostMapping
    public ResponseEntity<?> enrollBlackList(@RequestBody FromToUserIdDto idDto) {
        return ResponseEntity.ok().body(blackListService.enrollByUserId(idDto));
    }

    /**
     * 유저별 차단 계정 조회
     */
    @GetMapping("list")
    public ResponseEntity<?> BlackListByUser(@RequestBody FromToUserIdDto idDto) {
        return ResponseEntity.ok().body(blackListService.selectAllByFromUserId(idDto.getFromUserId()));
    }

    /**
     * 차단 계정 삭제
     */
    @DeleteMapping
    public ResponseEntity<?> deleteBlackList(@RequestBody FromToUserIdDto idDto) {
        return ResponseEntity.ok().body(blackListService.deleteByUserId(idDto));
    }
}
