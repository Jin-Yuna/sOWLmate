package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

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

    public List<User> selectAll() {
        return userRepository.findAll();
    }

    @Transactional
    public int deleteById(String userId) {
        return userRepository.deleteById(userId);
    }

    public User login(User user) {
//        log.debug("user.getId() : " + user.getId());
//        log.debug("user.getPassword() : " + user.getPassword());

        if (user.getId() == null || user.getPassword() == null) {
            return null;
        }

//        Optional<User> findedUser = userRepository.login(user);
//        log.debug("findedUser : " + findedUser.toString());
//
//        if (findedUser.equals(Optional.empty())) {
//            return null;
//        } else {
//            return findedUser.get();
//        }

        User findedUser = userRepository.findById(user.getId());
        if (findedUser.getPassword().equals(user.getPassword())) {
            return findedUser;
        } else {
            return null;
        }
    }

}
