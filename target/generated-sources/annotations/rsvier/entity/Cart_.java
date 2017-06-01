package rsvier.entity;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.Address;
import rsvier.entity.CartSuborder;
import rsvier.entity.User;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-01T15:10:21")
@StaticMetamodel(Cart.class)
public class Cart_ { 

    public static volatile SingularAttribute<Cart, Address> deliveryAddressId;
    public static volatile ListAttribute<Cart, CartSuborder> cartSuborderList;
    public static volatile SingularAttribute<Cart, BigDecimal> totalPrice;
    public static volatile SingularAttribute<Cart, Long> id;
    public static volatile SingularAttribute<Cart, User> userId;

}