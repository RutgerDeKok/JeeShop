package rsvier.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public enum ProductCategory {

    MEDIUM_HARD("Medium-Hard"),
    SOFT_MOLD("Zacht-Schimmel"),
    BLUE("Blauw"),
    CREAM("Roomkaas"),
    GOAT("Geiten"),
    ALL("Alles");

    private final String naamNed;

    private ProductCategory(String naamNed) {
        this.naamNed = naamNed;
    }

//    @JsonValue
    public String getNaamNed() {
        return naamNed;
    }

//    @Override
//    public String toString() {
//        return naamNL;
//    }

//    @JsonCreator
//    public static ProductCategory create(String val) {
//        ProductCategory[] categories = ProductCategory.values();
//        for (ProductCategory category : categories) {
//            if (category.getNL().equalsIgnoreCase(val)) {
//                return category;
//            }
//        }
//        return ALL;
//    }
}

/* examples
 * 
 * MEDIUM_HARD: Edam, Gouda, Emmentaler, Cheddar
 * SOFT_MOLD:	Camenbert, Brie, Neufch�tel
 * BLUE:  		Roquefort, Gorgonzola and Stilton.
 * CREAM: 		Philadelphia, Boursin,  mascarpone
 * GOAT: 		Meahhhh
 * ALL:  		only used as a filter option in menu
 */
