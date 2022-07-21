package com.ssafy.sowlmate.repository;

import com.ssafy.sowlmate.entity.Interest;
import com.ssafy.sowlmate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    List<Interest> findAllByUser(User user);
}
