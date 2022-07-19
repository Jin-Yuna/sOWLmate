package com.ssafy.sowlmate.repository;

import com.ssafy.sowlmate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    public User save(User user);

    public User findByNo(Long no);

    public User findById(String userId);

    public List<User> findAll();

    public int deleteById(String userId);
}
