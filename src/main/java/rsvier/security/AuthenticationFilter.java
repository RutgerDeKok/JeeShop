/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import javax.annotation.Priority;
import javax.crypto.SecretKey;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
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
public class AuthenticationFilter implements ContainerRequestFilter {

    private String propFile = "config.properties";        
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // get auth token from request header
        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);        
        // Check if the HTTP Authorization header is present and formatted correctly 
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new NotAuthorizedException("Authorization header must be provided");
        }
        // Extract the token from the HTTP Authorization header
        String token = authHeader.substring("Bearer".length()).trim();
        try {
            validateToken(token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }

    private void validateToken(String token) throws SignatureException, IOException {
        byte[] signingKey = getSigningKey();
        Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token);
    }

    private byte[] getSigningKey() throws IOException {
        Properties prop = new Properties();
        InputStream in = getClass().getClassLoader().getResourceAsStream(propFile);
        if (in != null) {
            prop.load(in);
        } else {
            throw new FileNotFoundException("No config.properties found");
        }        
        byte[] signingKey = prop.getProperty("key").getBytes(StandardCharsets.UTF_8);
        if (signingKey.length > 0) {
            return signingKey;
        } else {
            return createSigningKey();
        }        
    }
    
    private byte[] createSigningKey() throws IOException {
        SecretKey key = MacProvider.generateKey();
        byte[] signingKey = key.getEncoded();
        Properties prop = new Properties();
        OutputStream out = new FileOutputStream(propFile);
        prop.setProperty("key", new String(signingKey));
        prop.store(out, null);
        out.close();
        return signingKey;
    }
    
}
