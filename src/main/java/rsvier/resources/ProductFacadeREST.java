/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.resources;

import java.util.ArrayList;
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
import rsvier.model.CartSuborder;
import rsvier.model.Product;
import rsvier.model.ProductCategory;
import rsvier.persistence.ProductFacade;
import rsvier.model.EnumWrap;
import rsvier.persistence.CartSuborderFacade;


@Stateless
@Path("/products")
//@RolesAllowed( {"EMPLOYEE","ADMIN"} )
public class ProductFacadeREST {

    @EJB
    ProductFacade facade;
    @EJB
    CartSuborderFacade csoFacade;

    @POST
    @PermitAll
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Product entity) {
        facade.create(entity);
    }

    @PUT
    @PermitAll
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Product entity) {
        facade.edit(entity);
    }

    @DELETE
    @PermitAll
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        System.out.println("rsvier.resources.ProductFacadeREST.remove() id: "+id);
        //1. delete CartSubOrders that contain product to be deleted.
        List<CartSuborder> csoList =   csoFacade.findByProductId(id);
        for(CartSuborder cso:csoList){
            System.out.println("deleting sub order with id: "+cso.getId());
            csoFacade.remove(cso);
        }
              
        //2. delete product
        facade.remove(facade.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public Product find(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public List<Product> findAll() {
        return facade.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public List<Product> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return facade.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    @PermitAll
    public String countREST() {
               
        return String.valueOf(facade.count());
    }

    @GET
    @Path("categories")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public List<EnumWrap> getCategories() {
        List<EnumWrap> categoryList = new ArrayList<>();
        for (ProductCategory cat : ProductCategory.values()) {
            categoryList.add(new EnumWrap(cat.name(), cat.getNaamNed()));
        }
        System.out.println(categoryList);
        return categoryList;
    }
    
    
    @GET
    @Path("/cat/{categoryString}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @PermitAll
    public List<Product> findByCategory(@PathParam("categoryString") String categoryString) {
//        System.out.println("ProductFacadeREST.findByCategory(), categoryString: "+categoryString);
        ProductCategory category;
        try{
        category  = ProductCategory.valueOf(categoryString);
        } catch (Exception e) {
            System.out.println("Using default category ALL");
            category = ProductCategory.ALL;
//            categoryString= ProductCategory.ALL.name();
        }
        System.out.println("category send to facade: "+category.name());
        return facade.findByCategory(category);
       
    } 
    
}