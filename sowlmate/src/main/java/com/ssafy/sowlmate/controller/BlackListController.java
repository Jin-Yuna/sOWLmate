package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.BlackList;
import com.ssafy.sowlmate.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("blacklist")
public class BlackListController {

    private final BlackListService blackListService;

    /**
     * 차단 계정 생성
     */
    @PostMapping
    public BlackList enrollBlackList(String fromUserId, String toUserId) {
        return blackListService.enrollBlackListByUserId(fromUserId, toUserId);
    }

    /**
     * 유저별 차단 계정 조회
     */
    @GetMapping("{userId}")
    public List<BlackList> BlackListByUser(@PathVariable String userId) {
        return blackListService.selectAllByFromUserId(userId);
    }

    /**
     * 차단 계정 삭제
     */
    @DeleteMapping
    public void deleteBlackList(String fromUserId, String toUserId) {
        blackListService.deleteByFromUserIdAndToUserId(fromUserId, toUserId);
    }
}
