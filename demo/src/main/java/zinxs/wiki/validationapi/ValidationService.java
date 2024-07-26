package zinxs.wiki.validationapi;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.*;
import zinxs.wiki.accountsapi.google.GoogleAccount;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;
import zinxs.wiki.restobjects.request.GoogleRegistrationRequest;
import zinxs.wiki.restobjects.request.LoginRequest;
import zinxs.wiki.restobjects.request.RegistrationRequest;
import zinxs.wiki.validationapi.token.confirmation.ConfirmationToken;
import zinxs.wiki.validationapi.token.confirmation.ConfirmationTokenService;
import zinxs.wiki.validationapi.email.EmailSender;
import zinxs.wiki.validationapi.token.confirmation.Token;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ValidationService {


    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    private final AccountRepository accountRepository;


    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;

    private final String CLIENT_ID = "168876054670-t977a0o6isruvtsk2ieumtak6qrio1pa.apps.googleusercontent.com";
    private final AuthTokenUtils authTokenUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private Account getAccount(String tempToken){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            if(targetAccount.isEnabled()){
                return targetAccount;
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccount error " + e);
        }
    }
    public String isAdmin(String token){
        try{
            Account account = (Account) getAccount(token);
            if(account.getEmail().equals("josh.hooks@hotmail.com")) {
                return "true";
            }else{
                return "false";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String googleLogin(String idTokenStr){
        try{
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    // Specify the CLIENT_ID of the app that accesses the backend:
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    // Or, if multiple clients access the backend:
                    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                    .build();
            GoogleIdToken idToken = verifier.verify(idTokenStr);
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();

                Account account = (Account) accountRepository.findByEmail(email).get();

                if(account.isEnabled()) {
                    return authTokenUtils.generateTempTokenNoPassword(email, "");
                }else{
                    return "false";
                }
            } else {
                return "false";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    public String login(LoginRequest loginRequest) {
        String token = "";
        try{
            Account account = getAccount(loginRequest);
            if(account != null) {
                if(account.isEnabled()) {
                    token = authTokenUtils.generateTempToken(loginRequest.getEmail(), loginRequest.getPassword());
                    System.out.println("ValidationService login generated token " + token);
                }else{
                    return "Must validate email in order to login!";
                }
            }else{
                return "Error: Invalid account credentials";
            }
        }catch (Exception e){
            return "Error: Internal error has occurred";
        }
        System.out.println("ValidationService login token returned " + token);
        return token;
    }

    public String register(RegistrationRequest request) {
       /*TODO: implement this validator logic
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        */
        try {

            if(!request.getEmail().contains("@")){
                return "Email is invalid";
            }

            if(request.getPassword().length()<8){
                return "Password must be greater than 7 characters";
            }



          /*
                No confirm password in request object
          if(!request.getConfirmPassword().equals(request.getPassword())){
                return "Passwords do no match";
            }

           */
            if(request.getPassword().length() < 5){
                return "Password must be at least 5 characters long";
            }

            String token = signUpUser(
                    new Account(
                            request.getUsername(),
                            request.getEmail(),
                            request.getPassword(),
                            AccountRole.USER

                    )
            );

            new Thread(() -> {
                String link = "https://www.zinxswiki.com/api/v1/validation/confirm?token=" + token;
                emailSender.sendSignUpEmail(
                        request.getEmail(),
                        request.getUsername(), link);
            }).start();

            return "true";
        }catch (Exception e){
            return "Failed to send email";
        }
    }
    public String googleRegister(GoogleRegistrationRequest request) {
        try{
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    // Specify the CLIENT_ID of the app that accesses the backend:
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    // Or, if multiple clients access the backend:
                    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                    .build();
            GoogleIdToken idToken = verifier.verify(request.getToken());
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                String username = email.split("@")[0];

                String token = signUpUser(
                        new GoogleAccount(
                                username,
                                email,
                                AccountRole.USER

                        )
                );

                new Thread(() -> {
                   confirmToken(token);
                }).start();

                return "true";
            } else {
                return "false";
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }
    public String resetPassword(String email){
        try{
            String token = authTokenUtils.generateTempTokenNoPassword(email,"none");


            new Thread(() -> {
                Account account =(Account) accountRepository.findByEmail(email).get();
                emailSender.sendResetEmail(
                        email,
                        email, "https://www.zinxswiki.com/passwordreset/request?token="+token);
            }).start();
            return "true";
        }catch (Exception e){
            return "Failed to process request " + e.getMessage();
        }
    }



    @Transactional
    public ModelAndView confirmToken(String token) {
        ConfirmationToken confirmationToken = (ConfirmationToken) confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        enableAccount(
                confirmationToken.getAccount().getEmail());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/login");
        return modelAndView;
    }



    public boolean accountExists(Account account){
        return accountRepository
                .findByEmail(account.getEmail())
                .isPresent();
    }

    public Account getAccount(LoginRequest request){
        String email = request.getEmail();

        Optional<Account> accountByEmail = accountRepository.findByEmail(email);
        if(accountByEmail.isPresent()){
            Account account = (Account) accountByEmail.get();


            if(bCryptPasswordEncoder.matches(request.getPassword(),account.getPassword()) && account.isEnabled()){

                return account;
            }else{

                return null;
            }
        }else{

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


        accountRepository.save( (Account) account);

        String token = UUID.randomUUID().toString();

        Token confirmationToken = new ConfirmationToken(
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
