package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.service.JwtService;
import com.ssafy.sowlmate.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("auth")
public class AuthController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired private JwtService jwtService;
    @Autowired private UserService userService;
//    @Autowired private KakaoLogin kakaoLogin;

//    @ApiOperation(value = "로그인", notes = "Access-token과 로그인 결과 메세지를 반환한다.", response = Map.class)
    @PostMapping("login")
    public ResponseEntity<Map<String, Object>> login(User user) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User loginUser = userService.login(user);
            if (loginUser != null) {
                String token = jwtService.create("userid", loginUser.getId(), "access-token");// key, data, subject
                log.debug("로그인 토큰정보 : {}", token);
                resultMap.put("access-token", token);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.ACCEPTED;
            } else {
                resultMap.put("message", FAIL);
                status = HttpStatus.ACCEPTED;
            }
        } catch (Exception e) {
            log.error("로그인 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

//    @ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
//    @GetMapping("/info/{userid}")
//    public ResponseEntity<Map<String, Object>> getInfo(
//            @PathVariable("userid") String userid, HttpServletRequest request) {
////		logger.debug("userid : {} ", userid);
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = HttpStatus.ACCEPTED;
//        if (jwtService.isUsable(request.getHeader("access-token"))) {
//            log.info("사용 가능한 토큰!!!");
//            try {
////				로그인 사용자 정보.
//                User userInfo = userService.userInfo(userid);
//                resultMap.put("userInfo", userInfo);
//                resultMap.put("message", SUCCESS);
//                status = HttpStatus.ACCEPTED;
//            } catch (Exception e) {
//                log.error("정보조회 실패 : {}", e);
//                resultMap.put("message", e.getMessage());
//                status = HttpStatus.INTERNAL_SERVER_ERROR;
//            }
//        } else {
//            log.error("사용 불가능 토큰!!!");
//            resultMap.put("message", FAIL);
//            status = HttpStatus.ACCEPTED;
//        }
//        return new ResponseEntity<Map<String, Object>>(resultMap, status);
//    }

}
