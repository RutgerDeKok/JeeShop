package rsvier.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.entity.Product;
import rsvier.session.ProductFacade;

@Path ("/products")
public class ProductResource {
    
    @EJB
    private ProductFacade productFacade;
        
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<Product> getProducts(){
        return productFacade.findAll();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_XML)
    public Product getProductById(@PathParam("id") Long id) {
        return productFacade.find(id);
    }
    
}
