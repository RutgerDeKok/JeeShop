package rsvier.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.entity.FinalSuborder;
import rsvier.session.FinalSuborderFacade;

@Path ("/finalsuborders")
public class FinalSuborderResource {
    
    @EJB
    private FinalSuborderFacade FinalSuborderFacade;
        
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<FinalSuborder> getCartSuborders(){
        return FinalSuborderFacade.findAll();
    }
    
}
