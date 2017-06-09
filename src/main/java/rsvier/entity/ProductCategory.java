/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.entity;

//import javax.xml.bind.annotation.XmlEnum;
//import com.fasterxml.jackson.annotation.JsonCreator;
//import com.fasterxml.jackson.annotation.JsonValue;

//import javax.xml.bind.annotation.XmlEnumValue;
//import javax.xml.bind.annotation.XmlType;
/**
 *
 * @author HP
 */
//@XmlType(name = "category")
//@XmlEnum
public enum ProductCategory {

//	@XmlEnumValue(value = "Medium-Hard")
    MEDIUM_HARD("Medium-Hard"),
    //	@XmlEnumValue(value = "Zacht-Schimmel")
    SOFT_MOLD("Zacht-Schimmel"),
    //	@XmlEnumValue(value = "Blauw")
    BLUE("Blauw"),
    //	@XmlEnumValue(value = "Roomkaas")
    CREAM("Roomkaas"),
    //	@XmlEnumValue(value = "Geiten")
    GOAT("Geiten"),
    //	@XmlEnumValue(value = "Alles")
    ALL("Alles");

    private final String naamNL;

    private ProductCategory(String naamNL) {
        this.naamNL = naamNL;
    }

//    @JsonValue
    public String getNL() {
        return naamNL;
    }

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
