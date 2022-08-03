package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.dto.FromToUserIdDto;
import com.ssafy.sowlmate.entity.BlackList;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.BlackListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlackListService {

    private final BlackListRepository blackListRepository;
    private final UserService userService;

    public List<BlackList> selectAllByFromUserId(String fromUserId) {
        return blackListRepository.findAllByFromUserId(fromUserId);
    }

    public BlackList selectByFromUserIdAndToUserId(String fromUserId, String toUserId) {
        return blackListRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
    }

    @Transactional
    public BlackList enrollBlackList(BlackList blackList) {
        return blackListRepository.save(blackList);
    }

    @Transactional
    public BlackList enrollByUserId(FromToUserIdDto idDto) {
        User fromUser = userService.selectById(idDto.getFromUserId());
        User toUser = userService.selectById(idDto.getToUserId());

        BlackList blackList = new BlackList();
        blackList.setFromUser(fromUser);
        blackList.setToUser(toUser);

        return blackListRepository.save(blackList);
    }

    @Transactional
    public int deleteByUserId(FromToUserIdDto idDto) {
        return blackListRepository.deleteByFromUserIdAndToUserId(idDto.getFromUserId(), idDto.getToUserId());
    }
}
