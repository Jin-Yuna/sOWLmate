//package com.ssafy.sowlmate.entity;
//
//import lombok.*;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Getter @Setter
//@RequiredArgsConstructor
//public class UserInterest {
//
//    @Id @GeneratedValue
//    @Column(name = "user_interest_id")
//    private Long no;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @OneToMany(mappedBy = "userInterest")
//    private List<Interest> interests = new ArrayList<>();
//
//}
