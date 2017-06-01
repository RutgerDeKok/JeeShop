package rsvier.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.entity.User;
import rsvier.session.UserFacade;

@Path ("/users")
public class UserResource {
    
    @EJB
    private UserFacade userFacade;
        
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<User> getProducts(){
        return userFacade.findAll();
    }
    
}
