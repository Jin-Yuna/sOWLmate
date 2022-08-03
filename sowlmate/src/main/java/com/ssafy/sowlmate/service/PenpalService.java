package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.dto.FromToUserIdDto;
import com.ssafy.sowlmate.entity.Penpal;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.PenpalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

//    @Transactional
//    public void enrollPenpalByUserNo(long fromUserNo, long toUserNo) {
//        User fromUser = userService.selectByNo(fromUserNo);
//        User toUser = userService.selectByNo(toUserNo);
//
//        Penpal p = new Penpal();
//        p.setFromUser(fromUser);
//        p.setToUser(toUser);
//
//        Penpal p2 = new Penpal();
//        p2.setFromUser(toUser);
//        p2.setToUser(fromUser);
//
//        penpalRepository.save(p);
//        penpalRepository.save(p2);
//    }

    @Transactional
    public List<Penpal> enrollPenpalByUserId(FromToUserIdDto idDto) {
        User fromUser = userService.selectById(idDto.getFromUserId());
        User toUser = userService.selectById(idDto.getToUserId());

        Penpal p = new Penpal();
        p.setFromUser(fromUser);
        p.setToUser(toUser);

        Penpal p2 = new Penpal();
        p2.setFromUser(toUser);
        p2.setToUser(fromUser);

        List<Penpal> res = new ArrayList<>();
        res.add(penpalRepository.save(p));
        res.add(penpalRepository.save(p2));

        return res;
    }

//    @Transactional
//    public void deletePenpalByUserNo(long fromUserNo, long toUserNo) {
//        penpalRepository.deleteByFromUserNoAndToUserNo(fromUserNo, toUserNo);
//        penpalRepository.deleteByFromUserNoAndToUserNo(toUserNo, fromUserNo);
//    }

    @Transactional
    public int deletePenpalByUserId(FromToUserIdDto idDto) {
        int res = 0;
        res += penpalRepository.deleteByFromUserIdAndToUserId(idDto.getFromUserId(), idDto.getToUserId());
        res += penpalRepository.deleteByFromUserIdAndToUserId(idDto.getToUserId(), idDto.getFromUserId());
        return res;
    }
}
