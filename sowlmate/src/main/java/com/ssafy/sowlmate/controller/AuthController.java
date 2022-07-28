package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.UserInfoDto;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.service.JwtService;
import com.ssafy.sowlmate.service.UserService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AuthController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final JwtService jwtService;
    private final UserService userService;

    /**
     * Access-token과 로그인 결과 메세지를 반환한다.
     * @param user
     * @return
     */
    @PostMapping("login")
    public ResponseEntity<Map<String, Object>> login(User user) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User loginUser = userService.login(user);
            if (loginUser != null) {
                String token = jwtService.create("userid", loginUser.getId(), "access-token"); // key, data, subject
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

    /**
     * 회원 정보를 반환한다. (로그인한 사용자 찾기)
     * @param userId
     * @param request
     * @return
     */
    @GetMapping("info/{userId}")
    public ResponseEntity<Map<String, Object>> getInfo(
            @PathVariable("userId") String userId, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        if (jwtService.isUsable(request.getHeader("access-token"))) {
            log.info("사용 가능한 토큰!!!");
            try {
                User userInfo = userService.selectById(userId);
                UserInfoDto userInfoDto = UserInfoDto.toDto(userInfo);
                resultMap.put("userInfo", userInfoDto);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.ACCEPTED;
            } catch (Exception e) {
                log.error("정보조회 실패 : {}", e);
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            log.error("사용 불가능 토큰!!!");
            resultMap.put("message", FAIL);
            status = HttpStatus.ACCEPTED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


}
