package rsvier.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.entity.Sale;
import rsvier.session.SaleFacade;

@Path ("/sales")
public class SaleResource {
    
    @EJB
    private SaleFacade saleFacade;
        
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<Sale> getProducts(){
        return saleFacade.findAll();
    }
    
}
