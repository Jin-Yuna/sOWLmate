package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.Penpal;
import com.ssafy.sowlmate.service.PenpalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("penpal")
@RequiredArgsConstructor
public class PenpalController {

    private final PenpalService penpalService;

    /**
     * 펜팔 등록
     */
    @PostMapping
    public void enrollPenpal(String fromUserId, String toUserId) {
        penpalService.enrollPenpalByUserId(fromUserId, toUserId);
    }

    /**
     * 펜팔 전체 조회
     */
    @GetMapping("list")
    public List<Penpal> penpalList() {
        return penpalService.selectAll();
    }


    /**
     * 유저별 펜팔 조회
     */
    @GetMapping("{userId}")
    public List<Penpal> penpalListByUser(@PathVariable String userId) {
        return penpalService.selectAllByFromUserId(userId);
    }


    /**
     * 펜팔 삭제
     */
    @DeleteMapping
    public void deletePenpal(String fromUserId, String toUserId) {
        penpalService.deletePenpalByUserId(fromUserId, toUserId);
    }
}
