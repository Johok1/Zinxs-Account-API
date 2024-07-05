package zinxs.wiki.accountsapi;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import zinxs.wiki.jsonobjects.LoginRequest;
import zinxs.wiki.validationapi.confirmation.ConfirmationToken;
import zinxs.wiki.validationapi.confirmation.ConfirmationTokenService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AccountService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return (Account) accountRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    public boolean accountExists(Account account){
        return accountRepository
                .findByEmail(account.getEmail())
                .isPresent();
    }

    public Account getAccount(LoginRequest request){
        String email = request.getEmail();
        System.out.println("AccountService getAccount account email " + email);
        Optional<Account> accountByEmail = accountRepository.findByEmail(email);
        if(accountByEmail.isPresent()){
            Account account = (Account) accountByEmail.get();
            System.out.println("AccountService getAccount account " + account);
            System.out.println("AccountService getAccount account enabled " + account.isEnabled());
            if(bCryptPasswordEncoder.matches(request.getPassword(),account.getPassword()) && account.isEnabled()){
                System.out.println("AccountService getAccount account password " + account.getPassword());
                return account;
            }else{
                System.out.println("AccountService getAccount account ");
                return null;
            }
        }else{
            System.out.println("AccountService getAccount accountIspresent false");
            return null;
        }
    }

    public String signUpUser(Account account) {
        boolean accountExists = accountExists(account);

        if (accountExists) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.

            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(account.getPassword());

        account.setPassword(encodedPassword);
        System.out.println("AccountService signupUser account to save " + account);
        System.out.println("AccountService signupUser account to save email " + account.getEmail());

        accountRepository.save( (Account) account);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                account
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        return token;
    }

    public int enableAccount(String email) {
        return accountRepository.enableAccount(email);
    }


}
