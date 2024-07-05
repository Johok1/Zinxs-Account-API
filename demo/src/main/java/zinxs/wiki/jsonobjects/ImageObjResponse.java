package zinxs.wiki.jsonobjects;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.core.io.Resource;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ImageObjResponse {
    private final String filename;
    private final Resource file;
}
