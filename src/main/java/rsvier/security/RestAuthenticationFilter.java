/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.security;

import java.io.IOException;
import javax.annotation.Priority;
import javax.ejb.EJB;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author J
 */
@Authenticated
@Provider
@Priority(Priorities.AUTHENTICATION)
public class RestAuthenticationFilter implements ContainerRequestFilter {
    
    @EJB
    private TokenValidator tokenValidator;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        System.out.println("***   RUNNING REST FILTER   ***");
        
        Cookie cookie = requestContext.getCookies().get("AccessToken");
        String token = cookie.getValue();
        
        try {
            tokenValidator.validateToken(token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }

   
}
