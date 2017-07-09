package rsvier.resources;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.security.PermitAll;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import rsvier.model.Cart;
import rsvier.model.CartSuborder;
import rsvier.security.TokenValidator;
import rsvier.model.EnumWrap;
import rsvier.model.User;
import rsvier.model.UserType;
import rsvier.persistence.CartFacade;
import rsvier.persistence.UserFacade;
import rsvier.security.scrypt.SCryptUtil;
import rsvier.security.RolesAllowed;


@Stateless
@Path("/users")
public class UserFacadeREST {

    @EJB
    UserFacade facade;
    @EJB
    CartFacade cartFacade;
    @EJB
    private TokenValidator tokenValidator;

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
    @PermitAll
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
    @PermitAll
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<EnumWrap> getCategories() {
        List<EnumWrap> categoryList = new ArrayList<>();
        for (UserType type : UserType.values()) {
            categoryList.add(new EnumWrap(type.name(), type.getNaamNed(), type.getKortNed()));
        }
        return categoryList;
    }

    @GET
    @Path("/type/{typeString}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public List<User> findByType(@PathParam("typeString") String typeString) {

        UserType type;
        try {
            type = UserType.valueOf(typeString);
        } catch (Exception e) {
            System.out.println("Using default category ALL");
            type = UserType.ALL;
        }
        System.out.println("type send to facade: " + type.name());
        return facade.findByType(type);

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
    @Produces(MediaType.TEXT_PLAIN)
    @PermitAll
    @Path("/login")
    public Response doLogin(User login) {
        User dbUser = facade.findByEmail(login.getEmail());
        boolean correctPass = SCryptUtil.check(login.getPassHash(), dbUser.getPassHash());
        if (correctPass) {
            System.out.println("Succesvolle authenticatie");
            String token = null;
            try {
                token = tokenValidator.createToken(dbUser);
                System.out.println("Token received from generator: " + token);
            } catch (IOException ex) {
                Logger.getLogger(UserFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
                System.out.println("Onsuccesvolle authenticatie");
                return Response.status(500).build();
            }
            //Token uitpak test
            System.out.println("valid token? " + tokenValidator.validateToken(token));

            Map<String, String> map = new HashMap<>();
            map.put("token", token);
            map.put("email", dbUser.getEmail());
            map.put("type", dbUser.getType().name());
            map.put("id", dbUser.getId().toString());
            return Response.ok().entity(mapToJson(map)).build();

        } else {
            System.out.println("Onsuccesvolle authenticatie");
            return Response.status(404).build();
        }
    }

    @POST
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response create(User registerData) {

        try {  // try to store new user, will fail if email is not unique
            System.out.println("Gebruiker wordt geregistreerd");
            User newUser = new User();
            newUser.setType(UserType.CUSTOMER);
 
            newUser.setEmail(registerData.getEmail().trim());

            String passHash = SCryptUtil.scrypt(registerData.getPassHash().trim(), 16384, 8, 1);
            newUser.setPassHash(passHash);

            facade.create(newUser);

            // Create a new cart for the new user      
            User temp = facade.findByEmail(newUser.getEmail());
            Cart newCart = new Cart();
            newCart.setId(temp.getId());
            newCart.setUser(temp);
            List<CartSuborder> subs = new ArrayList<>();
            newCart.setCartSuborderList(subs);
            
            cartFacade.create(newCart);

            return Response.ok().entity("SUCCESS").build();
        } catch (Exception e) {
            return Response.ok().entity("EMAIL_IN_USE").build();
        }
    }
    
    
     private String mapToJson(Map<String, String> map) {
        StringBuilder jsonString = new StringBuilder("{");
        //{ "name":"John", "age":31, "city":"New York" }; json format

        Iterator it = map.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            jsonString.append("\"").append(pair.getKey()).append("\":\"").append(pair.getValue()).append("\",");
            it.remove(); // avoids a ConcurrentModificationException
        }
        jsonString.setLength(jsonString.length() - 1);
        jsonString.append("}");
        return jsonString.toString();
    }


}
