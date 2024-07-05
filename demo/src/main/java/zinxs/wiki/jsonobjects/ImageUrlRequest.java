package zinxs.wiki.jsonobjects;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageUrlRequest {
    private final String url;
    private final String blank;
}