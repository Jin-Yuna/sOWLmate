package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.entity.Penpal;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.PenpalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PenpalService {

    private final PenpalRepository penpalRepository;
    private final UserService userService;

    public List<Penpal> selectAll() {
        return penpalRepository.findAll();
    }

    public List<Penpal> selectAllByFromUserNo(long fromUserNo) {
        return penpalRepository.findAllByFromUserNo(fromUserNo);
    }

    public List<Penpal> selectAllByFromUserId(String fromUserId) {
        return penpalRepository.findAllByFromUserId(fromUserId);
    }

    @Transactional
    public void enrollPenpalByUserNo(long fromUserNo, long toUserNo) {
        User fromUser = userService.selectByNo(fromUserNo);
        User toUser = userService.selectByNo(toUserNo);

        Penpal p = new Penpal();
        p.setFromUser(fromUser);
        p.setToUser(toUser);

        Penpal p2 = new Penpal();
        p2.setFromUser(toUser);
        p2.setToUser(fromUser);

        penpalRepository.save(p);
        penpalRepository.save(p2);
    }

    @Transactional
    public void enrollPenpalByUserId(String fromUserId, String toUserId) {
        User fromUser = userService.selectById(fromUserId);
        User toUser = userService.selectById(toUserId);

        Penpal p = new Penpal();
        p.setFromUser(fromUser);
        p.setToUser(toUser);

        Penpal p2 = new Penpal();
        p2.setFromUser(toUser);
        p2.setToUser(fromUser);

        penpalRepository.save(p);
        penpalRepository.save(p2);
    }

    @Transactional
    public void deletePenpalByUserNo(long fromUserNo, long toUserNo) {
        penpalRepository.deleteByFromUserNoAndToUserNo(fromUserNo, toUserNo);
        penpalRepository.deleteByFromUserNoAndToUserNo(toUserNo, fromUserNo);
    }

    @Transactional
    public void deletePenpalByUserId(String fromUserId, String toUserId) {
        penpalRepository.deleteByFromUserIdAndToUserId(fromUserId, toUserId);
        penpalRepository.deleteByFromUserIdAndToUserId(toUserId, fromUserId);
    }

}
