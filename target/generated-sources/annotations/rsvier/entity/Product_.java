package rsvier.entity;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import rsvier.entity.CartSuborder;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-02T17:02:16")
@StaticMetamodel(Product.class)
public class Product_ { 

    public static volatile ListAttribute<Product, CartSuborder> cartSuborderList;
    public static volatile SingularAttribute<Product, BigDecimal> price;
    public static volatile SingularAttribute<Product, String> name;
    public static volatile SingularAttribute<Product, Long> id;
    public static volatile SingularAttribute<Product, String> category;
    public static volatile SingularAttribute<Product, String> brand;
    public static volatile SingularAttribute<Product, String> info;
    public static volatile SingularAttribute<Product, Integer> stockCount;

}