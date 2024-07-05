package zinxs.wiki.jsonobjects;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class GoogleRegistrationRequest {
    private final String token;
    private final String blank;
}
