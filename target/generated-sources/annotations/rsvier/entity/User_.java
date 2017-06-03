package rsvier.entity;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.Address;
import rsvier.entity.Cart;
import rsvier.entity.Sale;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-03T13:23:09")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile ListAttribute<User, Sale> saleList;
    public static volatile SingularAttribute<User, Address> billingAddressId;
    public static volatile SingularAttribute<User, Long> id;
    public static volatile SingularAttribute<User, String> passHash;
    public static volatile SingularAttribute<User, String> type;
    public static volatile SingularAttribute<User, String> email;
    public static volatile SingularAttribute<User, Character> enabled;
    public static volatile ListAttribute<User, Cart> cartList;

}