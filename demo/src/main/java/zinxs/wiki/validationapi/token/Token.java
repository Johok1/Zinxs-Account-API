package zinxs.wiki.validationapi.token.confirmation;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.accountsapi.Account;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@DiscriminatorColumn(name = "token_type")
public class Token {

    @SequenceGenerator(
            name = "confirmation_token_sequence",
            sequenceName = "confirmation_token_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "confirmation_token_sequence"
    )
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;



    public Token(String token,
                             LocalDateTime createdAt,
                             LocalDateTime expiresAt
                            ) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;

    }
}