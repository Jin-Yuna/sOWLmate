//package com.ssafy.sowlmate.entity;
//
//import lombok.*;
//
//import javax.persistence.*;
//
//@Entity
//@Getter @Setter
//@RequiredArgsConstructor
//public class Interest {
//
//    @Id @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "interest_id")
//    private Long no;
//
//
////    private String title;
////    private String content;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_interest_id")
//    private UserInterest userInterest;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "interest_item_id")
//    private InterestItem interestItem;
//}
