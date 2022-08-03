package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.UserInfoDto;
import com.ssafy.sowlmate.dto.UserProfileDto;
import com.ssafy.sowlmate.dto.UserRequestDto;
import com.ssafy.sowlmate.dto.UserUpdateRequestDto;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    /**
     * 유저 회원가입
     */
    @PostMapping
    public ResponseEntity<?> enrollUser(@RequestBody User user) {
        User enrolledUser = userService.enroll(user);
        return ResponseEntity.ok().body(UserInfoDto.toDto(enrolledUser));
    }

    /**
     * 사용자 리스트
     */
    @GetMapping("list")
    public ResponseEntity<?> userList() {
        return ResponseEntity.ok().body(userService.selectAll());
    }

    /**
     * 존재하는 유저 아이디 여부 확인
     */
    @GetMapping("exist/id")
    public ResponseEntity<?> userInfo(@RequestBody UserRequestDto requestDto) {
        User user = userService.selectById(requestDto.getUserId());
        return ResponseEntity.ok().body(user == null ? "empty" : "exist");
    }

    /**
     * 존재하는 닉네임 여부 확인
     */
    @GetMapping("exist/nickname")
    public ResponseEntity<?> existNickname(@RequestBody UserRequestDto requestDto) {
        User user = userService.selectByNickname(requestDto.getUserNickname());
        return ResponseEntity.ok().body(user == null ? "empty" : "exist");
    }

    /**
     * 유저 정보 수정
     */
    @PutMapping
    public ResponseEntity<?> updateUserInfo(@RequestBody UserUpdateRequestDto updateDto) {
        return ResponseEntity.ok().body(userService.updateUser(updateDto));
    }

    /**
     * 유저 정보 수정 : profilePictureUrl
     */
    @PutMapping("profile")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserProfileDto profileDto) {
        return ResponseEntity.ok().body(userService.updateUserProfile(profileDto));
    }

    /**
     * 유저 정보 삭제
     */
    @DeleteMapping
    public ResponseEntity<?> deleteUserInfo(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok().body(userService.deleteById(requestDto.getUserId()));
    }
}
