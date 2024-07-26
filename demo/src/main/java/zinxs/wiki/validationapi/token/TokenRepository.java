package zinxs.wiki.validationapi.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import zinxs.wiki.validationapi.token.confirmation.Token;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TokenRepository
        extends JpaRepository<zinxs.wiki.validationapi.token.confirmation.Token, Long> {

    Optional<Token> findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE Token c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);
}
