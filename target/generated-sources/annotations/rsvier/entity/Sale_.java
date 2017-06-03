package rsvier.entity;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.FinalSuborder;
import rsvier.entity.User;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-03T13:23:09")
@StaticMetamodel(Sale.class)
public class Sale_ { 

    public static volatile SingularAttribute<Sale, String> zipCode;
    public static volatile SingularAttribute<Sale, String> city;
    public static volatile SingularAttribute<Sale, BigDecimal> totalPrice;
    public static volatile SingularAttribute<Sale, User> userId;
    public static volatile SingularAttribute<Sale, String> firstName;
    public static volatile SingularAttribute<Sale, Integer> number;
    public static volatile SingularAttribute<Sale, String> numAddition;
    public static volatile SingularAttribute<Sale, String> street;
    public static volatile SingularAttribute<Sale, String> familyName;
    public static volatile ListAttribute<Sale, FinalSuborder> finalSuborderList;
    public static volatile SingularAttribute<Sale, String> insertion;
    public static volatile SingularAttribute<Sale, Long> id;
    public static volatile SingularAttribute<Sale, byte[]> orderDate;

}