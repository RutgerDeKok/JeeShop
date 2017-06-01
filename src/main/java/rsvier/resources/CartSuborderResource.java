package rsvier.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.entity.CartSuborder;
import rsvier.session.CartSuborderFacade;

@Path ("/cartsuborders")
public class CartSuborderResource {
    
    @EJB
    private CartSuborderFacade cartSuborderFacade;
        
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<CartSuborder> getCartSuborders(){
        return cartSuborderFacade.findAll();
    }
    
}
