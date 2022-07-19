package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Transactional
    public Long enroll(User user) {
        return userRepository.save(user).getNo();
    }

    public User select(Long no) {
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

}
