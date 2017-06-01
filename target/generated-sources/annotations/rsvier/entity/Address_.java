package rsvier.entity;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.Cart;
import rsvier.entity.User;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-01T15:10:21")
@StaticMetamodel(Address.class)
public class Address_ { 

    public static volatile SingularAttribute<Address, String> firstName;
    public static volatile SingularAttribute<Address, Integer> number;
    public static volatile SingularAttribute<Address, String> zipCode;
    public static volatile ListAttribute<Address, User> userList;
    public static volatile SingularAttribute<Address, String> numAddition;
    public static volatile SingularAttribute<Address, String> city;
    public static volatile SingularAttribute<Address, String> street;
    public static volatile SingularAttribute<Address, String> familyName;
    public static volatile SingularAttribute<Address, String> insertion;
    public static volatile SingularAttribute<Address, Long> id;
    public static volatile ListAttribute<Address, Cart> cartList;

}