/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.persistence;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import rsvier.model.CartSuborder;
import rsvier.model.Product;

/**
 *
 * @author HP
 */
@Stateless
public class CartSuborderFacade extends AbstractFacade<CartSuborder> {

    @PersistenceContext(unitName = "rsvier_jeeshop_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public CartSuborderFacade() {
        super(CartSuborder.class);
    }
    
     public List<CartSuborder> findByProductId(Long productId) {
        System.out.println("Facade Finding SubOrders by Product Id: " + productId.toString());

        return em.createNamedQuery("CartSuborder.findByProductId")
                .setParameter("productid", productId)
                .getResultList();
    }
     
      public List<CartSuborder> findByCartId(Long cartId) {
        System.out.println("Facade Finding SubOrders by Cart Id: " + cartId.toString());

        return em.createNamedQuery("CartSuborder.findByCartId")
                .setParameter("cartid", cartId)
                .getResultList();
    }
    
}
