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
import rsvier.model.User;
import rsvier.model.UserType;

/**
 *
 * @author HP
 */
@Stateless
public class UserFacade extends AbstractFacade<User> {

    @PersistenceContext(unitName = "rsvier_jeeshop_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UserFacade() {
        super(User.class);
    }

    public User findByEmail(String email) {
        return (User) em.createNamedQuery("User.findByEmail")
                        .setParameter("email", email).getSingleResult();
    }
    
     public List<User> findByType(UserType type) {
        System.out.println("Facade Finding Users by Type: " + type.name());
        if (type.name().equals("ALL")) {
            System.out.println("returning all");
            return findAll();
            
        } else {
            return em.createNamedQuery("User.findByType")
                    .setParameter("type", type)
                    .getResultList();
        }

    }
    
    
}
