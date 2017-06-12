/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.persistence;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import rsvier.model.FinalSuborder;

/**
 *
 * @author HP
 */
@Stateless
public class FinalSuborderFacade extends AbstractFacade<FinalSuborder> {

    @PersistenceContext(unitName = "rsvier_jeeshop_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public FinalSuborderFacade() {
        super(FinalSuborder.class);
    }
    
}
