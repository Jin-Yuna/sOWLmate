package com.ssafy.sowlmate.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@RequiredArgsConstructor
public class Interest {

    @Id @GeneratedValue
    @Column(name = "interest_id")
    private Long no;

    @Enumerated(EnumType.STRING)
    private InterestType title;
    private String contents;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

}
