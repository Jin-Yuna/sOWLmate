package com.ssafy.sowlmate.entity;

import com.ssafy.sowlmate.entity.type.LanguageType;
import com.ssafy.sowlmate.entity.type.RegionType;
import com.ssafy.sowlmate.entity.type.Role;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@Table(name = "user")
public class User implements OAuth2User {

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
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RegionType region; // 대륙 enum type

    @Enumerated(EnumType.STRING)
    private LanguageType language;

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

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

//    @Override
//    public String getName() {
//        return id;
//    }

    @Enumerated(EnumType.STRING)
    private Role role;

    public User updateUser(User updateUser) {
        this.setProfilePictureUrl(updateUser.profilePictureUrl);
        return this;
    }

}
