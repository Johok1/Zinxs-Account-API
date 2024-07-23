package zinxs.wiki.accountsapi.utilities;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRepository;


import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Service

public class AuthTokenUtils {

    //contains methods for generated tokens and decoding tokens and validating tokens
    @Value("${config.application.jwtSecret}")
    private String jwtSecret;
    @Value("${config.application.jwtExpirationMs}")
    private int jwtExpirationMs;



    public final BCryptPasswordEncoder bCryptPasswordEncoder;

    public final AccountRepository accountRepository;

    public AuthTokenUtils(BCryptPasswordEncoder bCryptPasswordEncoder, AccountRepository accountRepository){
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.accountRepository = accountRepository;
    }

    private  SecretKey key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public  String generateTempToken(String email, String password) throws Exception {


        Optional<Account> account = accountRepository.findByEmail(email);
        if(account.isPresent()){

            if(bCryptPasswordEncoder.matches(password,account.get().getPassword())){
                return Jwts.builder()
                        .setSubject((email))
                        .setIssuedAt(new Date())
                        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                        .signWith(Keys.hmacShaKeyFor(key().getEncoded()), SignatureAlgorithm.HS256)
                        .compact();
            }else{
                //TODO: handle this case
                throw new Exception("Wrong password: " + password);
            }
        }else{
            //TODO: handle this case
            throw new Exception("No account associated with email!");
        }


    }

    public  String generateTempTokenNoPassword(String email, String password) throws Exception {


        Optional<Account> account = accountRepository.findByEmail(email);
        if(account.isPresent()){


                return Jwts.builder()
                        .setSubject((email))
                        .setIssuedAt(new Date())
                        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                        .signWith(Keys.hmacShaKeyFor(key().getEncoded()), SignatureAlgorithm.HS256)
                        .compact();

        }else{
            //TODO: handle this case
            throw new Exception("No account associated with email!");
        }


    }

    public  boolean isExpired(String tempToken){
        //check if token is expired return true if token is not expired false if it is
        Date expiration = Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(tempToken).getBody().getExpiration();

        if(expiration != null) {
            if(expiration.before(new Date(System.currentTimeMillis()))){
                return true;
            }else{
                return  false;
            }
        }else {
            throw new RuntimeException("unable to decode the email correctly");
        }
    }

    public String decodeEmail(String tempToken) throws RuntimeException{

            String email = Jwts.parserBuilder().setSigningKey(key()).build()
                    .parseClaimsJws(tempToken).getBody().getSubject();

            if (email != null && !(email.equals(""))) {
                return email;
            } else {
                throw new RuntimeException("unable to decode the email correctly");
            }

    }

}
