package zinxs.wiki.jsonobjects;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageItemUrlRequest {
    private final MultipartFile file;

    private final String filename;
    private final String blank;
}