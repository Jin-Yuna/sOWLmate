package com.ssafy.sowlmate.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
//@Builder
@Getter @Setter
@RequiredArgsConstructor
@Table(name = "user")
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
    private String region; // 대륙 enum type

    @Enumerated(EnumType.STRING)
    private UserLanStatus language;

    @Column(nullable = true)
    private String profilePictureUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Interest> interests = new ArrayList<>();

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-DD/HH:mm:ss")
    private LocalDateTime enrollDate;

    @PrePersist
    public void enroll_date() {
        this.enrollDate = LocalDateTime.now();
    }

}
