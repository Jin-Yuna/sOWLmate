package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.FromToUserIdDto;
import com.ssafy.sowlmate.service.PenpalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("penpal")
public class PenpalController {

    private final PenpalService penpalService;

    /**
     * 펜팔 등록
     */
    @PostMapping
    public ResponseEntity<?> enrollPenpal(@RequestBody FromToUserIdDto idDto) {
        return ResponseEntity.ok().body(penpalService.enrollPenpalByUserId(idDto));
    }

    /**
     * 펜팔 전체 조회
     */
    @GetMapping("list")
    public ResponseEntity<?> penpalList() {
        return ResponseEntity.ok().body(penpalService.selectAll());
    }


    /**
     * 유저별 펜팔 조회
     */
    @GetMapping("list/user")
    public ResponseEntity<?> penpalListByUser(@RequestBody FromToUserIdDto idDto) {
        return ResponseEntity.ok().body(penpalService.selectAllByFromUserId(idDto.getFromUserId()));
    }


    /**
     * 펜팔 삭제
     */
    @DeleteMapping
    public ResponseEntity<?> deletePenpal(@RequestBody FromToUserIdDto idDto) {
        return ResponseEntity.ok().body(penpalService.deletePenpalByUserId(idDto));
    }
}

