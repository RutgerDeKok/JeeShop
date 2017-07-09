package rsvier.security;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.Priority;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class RestAuthenticationFilter implements javax.ws.rs.container.ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;
    @EJB
    private TokenValidator tokenValidator;



    @Override
    public void filter(ContainerRequestContext requestContext) {
        System.out.println("REST FILTER METHOD RUNNING");
        Method method = resourceInfo.getResourceMethod();
        System.out.println("method: " + method.getName());
        // everybody can access (e.g. user/create or user/authenticate)
        if (!method.isAnnotationPresent(PermitAll.class)) {
            System.out.println("Permit all annotation not present");

            if (method.isAnnotationPresent(RolesAllowed.class)) {

                // get annotated roles
                RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
                Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
                System.out.println("roles allowed: "+rolesSet);

                // get role in token in cookie from logged in user
                String tokenUserType = null;
                String tokenFromCookie = null;
                for (Cookie cookie : requestContext.getCookies().values()) {
                    if (cookie.getName().equals("AccessToken")) {

                        System.out.println("goede Cookie gevonden");
                        tokenFromCookie = cookie.getValue();
                        break;
                    }
                }

               
                if (tokenFromCookie == null || !tokenValidator.validateToken(tokenFromCookie)) {
                    System.out.println("No (valid)token found");
                    requestContext.abortWith(
                            Response.status(Response.Status.BAD_REQUEST).entity("User must log in first").build()
                    );
                    return;

                } else {
                    tokenUserType = tokenValidator.getUserType(tokenFromCookie);
                    System.out.println("token user type= " + tokenUserType);
                }

                // Compare allowed roles to user type from token
                boolean allowed = false;
                for(String role :rolesSet){
                    if(role.equals(tokenUserType.trim())){
                        System.out.println(role);
                        allowed = true;
                        break;
                    }
                }
                System.out.println("allowed = "+allowed);
                
                if (!allowed) {
                    requestContext.abortWith(
                            Response.status(Response.Status.UNAUTHORIZED).entity("User unautorized to perform this action").build()
                    );
                    return;
                }
                
            } 
           
        }
        // if PermitAll annotation IS present just continue
        System.out.println("Access allowed");
    }

}
