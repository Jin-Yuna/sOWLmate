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

}
