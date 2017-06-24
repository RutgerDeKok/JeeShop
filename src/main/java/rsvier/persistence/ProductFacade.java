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
import rsvier.model.Product;
import rsvier.model.ProductCategory;

/**
 *
 * @author HP
 */
@Stateless
public class ProductFacade extends AbstractFacade<Product> {

    @PersistenceContext(unitName = "rsvier_jeeshop_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ProductFacade() {
        super(Product.class);
    }
    
    
     public List<Product> findByCategory(ProductCategory category) {
        System.out.println("Facade Finding Products by Category: " + category.name());
        if (category.name().equals("ALL")) {
            System.out.println("returning all");
            return findAll();
            
        } else {
            return em.createNamedQuery("Product.findByCategory")
                    .setParameter("category", category)
                    .getResultList();
        }

    }
    
}
