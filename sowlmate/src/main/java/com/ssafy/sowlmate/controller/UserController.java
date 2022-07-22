package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 유저 회원가입
     */
    @PostMapping
    public String enrollUser(User user) {
        Long enrolledUserNo = userService.enroll(user);

        return enrolledUserNo!=null ? "success" : "failed";
    }

    /**
     * 사용자 리스트
     */
    @GetMapping("list")
    public List<User> userList() {
        return userService.selectAll();
    }

    /**
     * 존재하는 유저 아이디 여부 확인
     */
    @GetMapping("{userId}")
    public String userInfo(@PathVariable String userId) {
        User user = userService.selectById(userId);
        if (user != null) {
            return "exist";
        } else {
            return "empty";
        }
    }

    /**
     * 존재하는 닉네임 여부 확인
     */
    @GetMapping("nickname/{nickname}")
    public String existNickname(@PathVariable String nickname) {
        User user = userService.selectByNickname(nickname);
        if (user != null) {
            return "exist";
        } else {
            return "empty";
        }
    }

    /**
     * 유저 정보 수정
     */
    @PutMapping("{userId}")
    public ResponseEntity<User> updateUserInfo(@PathVariable String userId, @RequestBody User user) {
        return ResponseEntity.ok().body(userService.updateUser(userId, user));
    }

    /**
     * 유저 정보 삭제
     */
    @DeleteMapping("{userId}")
    public String deleteUserInfo(@PathVariable String userId) {
        if (userService.deleteById(userId) > 0) {
            return "success";
        } else {
            return "failed";
        }
    }

}
