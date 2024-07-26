package zinxs.wiki.validationapi.token.confirmation;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import zinxs.wiki.accountsapi.Account;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@DiscriminatorValue("confirmation")
public class ConfirmationToken extends zinxs.wiki.validationapi.token.confirmation.Token {



    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "account_id"
    )
    private Account account;

    public ConfirmationToken(String token,
                             LocalDateTime createdAt,
                             LocalDateTime expiresAt, Account account){
        super(token, createdAt, expiresAt);
        this.account = account;
    }

}