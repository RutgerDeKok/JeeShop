/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.resources;

import java.util.List;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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
import rsvier.model.Cart;
import rsvier.persistence.CartFacade;

/**
 *
 * @author HP
 */
@Stateless
@Path("/carts")
@RolesAllowed( {"EMPLOYEE","ADMIN"} )

public class CartFacadeREST {

    @EJB
    private CartFacade facade;

    @POST
    @PermitAll
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Cart entity) {
        facade.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Cart entity) {
        facade.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        facade.remove(facade.find(id));
    }

    @GET
    @PermitAll
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Cart find(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @GET
    @PermitAll
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Cart> findAll() {
        return facade.findAll();
    }

    @GET
    @PermitAll
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Cart> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return facade.findRange(new int[]{from, to});
    }

    @GET
    @PermitAll
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(facade.count());
    }
    
    @Path("{id}/addresses")
    @PermitAll
    public AddressFacadeREST getBillingAddress() {
        return new AddressFacadeREST();
    }
    
    @Path("{id}/suborders")
    @PermitAll
    public CartSuborderFacadeREST getCartSubOrders() {
        return new CartSuborderFacadeREST();
    }
    
    @Path("{id}/sales")
    @PermitAll
    public SaleFacadeREST getSale() {
        return new SaleFacadeREST();
    }

}
