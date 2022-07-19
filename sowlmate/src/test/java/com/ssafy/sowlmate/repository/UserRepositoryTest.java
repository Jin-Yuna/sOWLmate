package com.ssafy.sowlmate.repository;

import com.ssafy.sowlmate.entity.User;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    @Transactional
    public void testMember() throws Exception {
        //given
        User user = new User();
        user.setNickname("memberA");
        Long savedNo = userRepository.save(user).getNo();

        //when
        User findedUser = userRepository.findByNo(savedNo);

        //then
        Assertions.assertThat(findedUser.getNo()).isEqualTo(user.getNo());
    }
}