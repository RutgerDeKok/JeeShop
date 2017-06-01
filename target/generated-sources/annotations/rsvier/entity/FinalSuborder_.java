package rsvier.entity;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.Sale;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-01T15:10:21")
@StaticMetamodel(FinalSuborder.class)
public class FinalSuborder_ { 

    public static volatile SingularAttribute<FinalSuborder, String> prdBrand;
    public static volatile SingularAttribute<FinalSuborder, Integer> quantity;
    public static volatile SingularAttribute<FinalSuborder, String> prdName;
    public static volatile SingularAttribute<FinalSuborder, Sale> orderId;
    public static volatile SingularAttribute<FinalSuborder, BigDecimal> itemPrice;
    public static volatile SingularAttribute<FinalSuborder, Long> id;
    public static volatile SingularAttribute<FinalSuborder, String> prdCategory;
    public static volatile SingularAttribute<FinalSuborder, BigDecimal> subTotal;

}