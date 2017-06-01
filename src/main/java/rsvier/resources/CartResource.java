package rsvier.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.entity.Cart;
import rsvier.session.CartFacade;

@Path ("/carts")
public class CartResource {
    
    @EJB
    private CartFacade cartFacade;
        
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<Cart> getAddresses(){
        return cartFacade.findAll();
    }
    
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_XML)
    public Cart getCartById(@PathParam("id") Long id) {
        return cartFacade.find(id);
    }
    
}
