package zinxs.wiki.accountsapi;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import zinxs.wiki.pagesapi.Page;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "accounts", indexes = {
        @Index(name = "idx_username", columnList = "username"),
        @Index(name = "idx_email", columnList = "email", unique = true),
        @Index(name = "idx_nickname", columnList = "nickname")
})
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class Account implements UserDetails {

    @SequenceGenerator(
            name = "account_sequence",
            sequenceName = "account_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "account_sequence"
    )
    private Long id;

    private ArrayList<Page> pages;
    private String username, password, email, nickname;

    @Lob
    private byte[] profileImage;
    private boolean locked = false, enabled = false;
    @Enumerated(EnumType.STRING)
    protected AccountRole accountRole;


    public Account(String username,
                   String email,
                   String password,

                   AccountRole accountRole) {
        this.username = username;

        this.email = email;
        this.password = password;
        this.accountRole = accountRole;
        this.pages = new ArrayList<>();
    }

    public String getUsername(){
        return  this.username;
    }

    public String getEmail() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(accountRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


}
