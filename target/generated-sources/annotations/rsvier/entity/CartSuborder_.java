package rsvier.entity;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.Cart;
import rsvier.entity.Product;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-03T13:23:09")
@StaticMetamodel(CartSuborder.class)
public class CartSuborder_ { 

    public static volatile SingularAttribute<CartSuborder, Integer> quantity;
    public static volatile SingularAttribute<CartSuborder, Product> productId;
    public static volatile SingularAttribute<CartSuborder, Cart> cartId;
    public static volatile SingularAttribute<CartSuborder, Long> id;
    public static volatile SingularAttribute<CartSuborder, BigDecimal> subTotal;

}