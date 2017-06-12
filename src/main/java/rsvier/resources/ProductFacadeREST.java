/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.resources;

import java.util.ArrayList;
import java.util.List;
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
import rsvier.model.Product;
import rsvier.model.ProductCategory;
import rsvier.persistence.ProductFacade;
import rsvier.model.EnumWrap;


@Stateless
@Path("/products")
public class ProductFacadeREST {

    @EJB
    ProductFacade facade;

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Product entity) {
        facade.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Product entity) {
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
//    @Produces( MediaType.APPLICATION_JSON)
    public Product find(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Product> findAll() {
        return facade.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Product> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return facade.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        System.out.println("count methode");
        return String.valueOf(facade.count());
    }

    @GET
    @Path("categories")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<EnumWrap> getCategories() {
        System.out.println("getting categories");
        List<EnumWrap> categoryList = new ArrayList<>();
        for (ProductCategory cat : ProductCategory.values()) {
            categoryList.add(new EnumWrap(cat.name(), cat.getNaamNed()));
        }
        System.out.println(categoryList);
        return categoryList;
    }

//        @GET
//    @Path("categories")
//    @Produces(MediaType.APPLICATION_XML)
//    public ProductCategory[] getCategories() {
//        System.out.println("getting categories");
//        ProductCategory[] categoryMap = new ProductCategory[ProductCategory.values().length];
//        int i=0;
//        for (ProductCategory cat : ProductCategory.values()) {
//            categoryMap[i]=cat;
//            i++;
//        }
//        System.out.println(categoryMap);
//        return categoryMap;
//    }
//    @GET
//    @Path("categories")
//    @Produces(MediaType.APPLICATION_XML)
//    public Map<String, String> getCategories() {
//        System.out.println("getting categories");
//        Map<String, String> categoryMap = new HashMap<>();
//        for(ProductCategory cat:ProductCategory.values()){
//            
//            categoryMap.put(cat.name(), cat.getNL());
//        }
//        System.out.println(categoryMap);
//        return categoryMap;
//    }
//    @GET
//    @Path("categories")
//    @Produces(MediaType.APPLICATION_XML)
//    public Response getCategories() {
//        System.out.println("getting categories");
//
//        Map<String, String> categoryMap = new HashMap<>();
//        for (ProductCategory cat : ProductCategory.values()) {
//
//            categoryMap.put(cat.name(), cat.getNL());
//        }
//        System.out.println(categoryMap);
//
//        GenericEntity< Map<String, String>> entity;
//
//        entity = new GenericEntity< Map<String, String>>(categoryMap) {
//        };
//        
//        Response response = Response.ok(entity).build();
//        System.out.println(response);
//
//        return response;
//    }
//        @GET
//    @Path("categories")
//    @Produces(MediaType.APPLICATION_XML)
//    public ProductCategoryMap getCategories() {
//        System.out.println("getting categories");
//        ProductCategoryMap categoryMap = new ProductCategoryMap();
//        for(ProductCategory cat:ProductCategory.values()){
//            
//            ProductCategoryMap.put(cat.name(), cat.getNL());
//        }
//        System.out.println(categoryMap);
//        return categoryMap;
//    }
//    
//}
//       @GET
//    @Path("categories")
//    @Produces(MediaType.APPLICATION_XML)
//    public List<ProductCategory> getCategories() {
//        System.out.println("getting categories");
//        List<ProductCategory>categoryMap = new ArrayList<ProductCategory>();
//        int i=0;
//        for (ProductCategory cat : ProductCategory.values()) {
//            categoryMap.add(cat);
//            i++;
//        }
//        System.out.println(categoryMap);
//        return categoryMap;
//    }
//    @GET
//    @Path("categories")
////    @Produces(MediaType.APPLICATION_JSON)
//    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
//    public JSONObject getCategories() {
//        System.out.println("getting categories");
//       
//        Map<String, String> map = new HashMap<>();
//        for (ProductCategory cat : ProductCategory.values()) {
//
//            map.put(cat.name(), cat.getNL());
//        }
////        Map<String, String> map = new HashMap<>();
////        map.put("one","hello");
////        map.put("two","world");
//        JSONObject job = new JSONObject(map);
////        job.put("res",map);
//        System.out.println("map = "+map);
//        System.out.println("JSONObject = "+job);
//        return job;
//    }
//     @GET
//    @Path("categories")
//    @Produces(MediaType.APPLICATION_XML)
//    public MyMap<String, String> getCategories() {
//        System.out.println("getting categories");
//        MyMap<String, String> categoryMap = new MyMap<> ();
//        for(ProductCategory cat:ProductCategory.values()){
//            
//            categoryMap.put(cat.name(), cat.getNL());
//        }
//        System.out.println(categoryMap);
//        return categoryMap;
//    }
//    @GET
//    @Path("categories")
//    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
//        public List<String> getCategories() {
//        System.out.println("getting categories");
//        List<String> categoryList = new ArrayList<>();
//        for(ProductCategory cat:ProductCategory.values()){
//            
//            categoryList.add(cat.name());
//            categoryList.add(cat.getNL());
//        }
//        System.out.println(categoryList);
//        return categoryList;
//    }
    
    
//    @GET
//    @Path("cattest")
//    @Produces( MediaType.APPLICATION_JSON)
//    public JSONArray getCategoriesTest() {
//        System.out.println("getting categories");
//        JSONArray categoryList = new JSONArray();
//      
//        for (ProductCategory cat : ProductCategory.values()) {
//            JSONObject obj = new JSONObject("{\"name\":\""+ cat.name()+"\",\"readableName\":\""+cat.getNaamNed()+"\"}");
//            categoryList.put(obj);
//        }
//       
//        System.out.println(categoryList);
//        return categoryList;
//    }
    
   
}
