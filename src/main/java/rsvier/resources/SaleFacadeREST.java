/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.resources;

import java.time.LocalDate;
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
import rsvier.model.Sale;
import rsvier.persistence.SaleFacade;
import rsvier.security.RolesAllowed;

/**
 *
 * @author HP
 */
@Stateless
@Path("/sales")
public class SaleFacadeREST {

    @EJB
    SaleFacade facade;

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public void create(Sale entity) {
        facade.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Sale entity) {
        facade.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        facade.remove(facade.find(id));
    }

    @GET
    @Path("{id}")
    @PermitAll
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Sale find(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @GET
    @PermitAll
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Sale> findAll() {
        
//        //tijdelijke datum generator
//         List<Sale> list = facade.findAll();
//         int i = 0;
//         for(Sale sale : list){
//             LocalDate date = LocalDate.now().minusDays(i);
//             sale.setOrderDate(date);
//             facade.edit(sale);
//             i++;
//         }
//         // einde tijdelijke datum generator
         
        return facade.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @PermitAll
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Sale> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return facade.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(facade.count());
    }
    
    @Path("{id}/suborders")
    @PermitAll
    public FinalSuborderFacadeREST getSuborders() {
        return new FinalSuborderFacadeREST();
    }
 
}
