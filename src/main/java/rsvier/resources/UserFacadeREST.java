
package rsvier.resources;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rsvier.model.AuthToken;
import rsvier.model.EnumWrap;
import rsvier.model.User;
import rsvier.model.UserType;
import rsvier.persistence.UserFacade;

/**
 *
 * @author HP
 */
@Stateless
@Path("/users")
@PermitAll
public class UserFacadeREST{

    @EJB
    UserFacade facade;
    @Inject
    AuthToken authToken;

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(User entity) {
        entity.setJwt(authToken.createToken());
        facade.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, User entity) {
        facade.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        facade.remove(facade.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public User find(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findAll() {
        return facade.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return facade.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(facade.count());
    }
    
    @GET
    @Path("types")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<EnumWrap> getCategories() {
        List<EnumWrap> categoryList = new ArrayList<>();
        for (UserType type : UserType.values()) {
            categoryList.add(new EnumWrap(type.name(), type.getNaamNed(), type.getKortNed()));
        }
        return categoryList;
    }
    
    @Path("{id}/addresses")
    public AddressFacadeREST getAddresses() {
        return new AddressFacadeREST();
    }
    
    @Path("{id}/carts")
    public CartFacadeREST getCart() {
        return new CartFacadeREST();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/login")
    public boolean doLogin(User login) {
        User db = facade.findByEmail(login.getEmail());
        authToken.verifyToken(login);
        return (db.getPassHash().equals(login.getPassHash()));
        
    }
    
}
