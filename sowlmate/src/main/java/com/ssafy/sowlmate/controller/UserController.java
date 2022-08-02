package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.MailDto;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.service.SendEmailService;
import com.ssafy.sowlmate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SendEmailService sendEmailService;

    /**
     * Find Password by email
     */
    // Email과 name의 일치여부를 check하는 controller
    @GetMapping("findpw")
    public @ResponseBody Map<String, Boolean> findPw(String userEmail, String userName) {
        Map<String, Boolean> json = new HashMap<>();
        boolean findPwCheck = userService.userEmailCheck(userEmail, userName);

        System.out.println(findPwCheck);
        json.put("check", findPwCheck);

        return json;
    }

    // 등록된 email로 tempPassword를 발송하고, 발송된 tempPassword로 사용자의 pw를 변경하는 controller
    @PostMapping("findpw/sendemail")
    public @ResponseBody void sendEmail(String userEmail, String userName){
        MailDto dto = sendEmailService.createMailAndChangePassword(userEmail, userName);
        sendEmailService.sendEmail(dto);
    }

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
     * 유저 정보 수정 : profilePictureUrl
     */
    @PutMapping("profile/{userId}")
    public ResponseEntity<String> updateUserInfo(@PathVariable String userId, @RequestBody String profilePictureUrl) {
        return ResponseEntity.ok().body(userService.updateUserProfile(userId, profilePictureUrl));
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

//    /**
//     * userid, name으로 존재하는 유저인지 확인
//     */
//    @GetMapping("exist")
//    public String existUser(String userId, String userName) {
//        User user = userService.selectByUserIdAndUserName(userId, userName);
//        return user.equals(null) ? "empty" : "exist";
//    }
//
//    /**
//     * email로 임시비밀번호 전송
//     */
//    @GetMapping("send/temppass")
//    public void sendTempPassword(String userId, String userName) {
//        sendEmailService.sendEmail(sendEmailService.createMailAndChangePassword(userId, userName));
//    }

}
