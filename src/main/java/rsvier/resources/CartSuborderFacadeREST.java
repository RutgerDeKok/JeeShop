/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.resources;

import java.util.List;
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
import rsvier.model.CartSuborder;
import rsvier.persistence.CartSuborderFacade;
import rsvier.security.RolesAllowed;

/**
 *
 * @author HP
 */
@Stateless
@Path("/cartsuborders")
public class CartSuborderFacadeREST{

    @EJB
    private CartSuborderFacade facade;

    @POST
    @PermitAll
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(CartSuborder entity) {
        facade.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, CartSuborder entity) {
        facade.edit(entity);
    }

    @DELETE
    @PermitAll
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        facade.remove(facade.find(id));
    }

    @GET
    @Path("{id}")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public CartSuborder find(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @GET
    @PermitAll
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<CartSuborder> findAll() {
//        List<CartSuborder>  test = facade.findAll();
//        System.out.println(test.get(0));
//          return test;
        return facade.findAll();
    }

    @GET
    @PermitAll
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<CartSuborder> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return facade.findRange(new int[]{from, to});
    }

    @GET
    @PermitAll
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(facade.count());
    }
    
    
    @GET
    @Path("/product/{productId}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public List<CartSuborder> findByProductId(@PathParam("productId") Long productId) {
        System.out.println("rsvier.resources.CartSuborderFacadeREST.findByProductId():"+productId);
        return facade.findByProductId(productId);
       
    }
    
    
}
