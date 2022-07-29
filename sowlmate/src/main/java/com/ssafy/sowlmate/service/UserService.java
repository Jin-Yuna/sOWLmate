package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public Long enroll(User user) {
        return userRepository.save(user).getNo();
    }

    public User selectByNo(Long no) {
        return userRepository.findByNo(no);
    }

    public User selectById(String userId) {
        return userRepository.findById(userId);
    }

    public User selectByUserIdAndUserName(String userId, String userName) {
        return userRepository.findByIdAndName(userId, userName);
    }

    public User selectByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    public List<User> selectAll() {
        return userRepository.findAll();
    }

    @Transactional
    public int deleteById(String userId) {
        return userRepository.deleteById(userId);
    }

    /**
     * Find Password by email
     * : emil을 통해 해당 email로 가입된 정보가 있는지 확인하고,
     *   가입된 정보가 있다면 입력받은 name과 등록된 name이 일치한지 여부를 return
     */
    public boolean userEmailCheck(String userEmail, String userName) {
        User user = userRepository.findById(userEmail);
        if(user != null && user.getName().equals(userName)) {
            return true;
        } else {
            return false;
        }
    }

    public User login(User user) {
        if (user.getId() == null || user.getPassword() == null) {
            return null;
        }

        User findedUser = userRepository.findById(user.getId());

        if (findedUser.getPassword().equals(user.getPassword())) {
            return findedUser;
        } else {
            return null;
        }
    }

    @Transactional
    public User updateUser(String userId, User user) {
        User findedUser = userRepository.findById(userId);

        findedUser.setNickname(user.getNickname());
        findedUser.setPassword(user.getPassword());
        findedUser.setLanguage(user.getLanguage());
        findedUser.setRegion(user.getRegion());
        findedUser.setProfilePictureUrl(user.getProfilePictureUrl());

        userRepository.save(findedUser);
        return findedUser;
    }

    /**
     * Find Password by email
     */


}
