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
import rsvier.model.Cart;

/**
 *
 * @author HP
 */
@Stateless
public class CartFacade extends AbstractFacade<Cart> {

    @PersistenceContext(unitName = "rsvier_jeeshop_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public CartFacade() {
        super(Cart.class);
    }
    
//      public Cart findByUserId(Long userId) {
//        System.out.println("Facade Finding Cart by User Id: " + userId.toString());
//
//        Cart first = (Cart)em.createNamedQuery("Cart.findByUserId")
//                .setParameter("userid", userId)
//                .getResultList().get(0);
//        return first;
//    }
   
    
    
    

}
