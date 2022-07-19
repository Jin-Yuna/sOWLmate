package com.ssafy.sowlmate.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long no;

    @NotNull
    private String id;
    @NotNull
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private String email;

    private String region;

    @Enumerated(EnumType.STRING)
    private UserLanStatus language;

}
