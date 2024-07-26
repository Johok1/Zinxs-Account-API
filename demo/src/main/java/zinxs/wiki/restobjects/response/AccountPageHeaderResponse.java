package zinxs.wiki.restobjects.response;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AccountPageHeaderResponse {
    String pageId;
    String pageName;

}
