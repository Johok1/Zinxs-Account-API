package zinxs.wiki.validationapi.token.confirmation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import zinxs.wiki.validationapi.token.TokenRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final TokenRepository tokenRepository;

    public void saveConfirmationToken(zinxs.wiki.validationapi.token.confirmation.Token token) {
        tokenRepository.save(token);
    }

    public Optional<zinxs.wiki.validationapi.token.confirmation.Token> getToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return tokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}