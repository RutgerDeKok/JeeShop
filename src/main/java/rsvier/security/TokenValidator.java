/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.ejb.Singleton;
import rsvier.model.User;

@Singleton
public class TokenValidator {
    
    private String propFile = "config.properties";

    public TokenValidator() {
    }

    @PostConstruct
    public void init() {
        createSigningKey();
    }

    public boolean validateToken(String token) {
        return unpackToken(token) != null;
    }
    

    public String getUserType(String token) {
        Claims claim = unpackToken(token);
        return (String) claim.get("Type");
    }
    

    private Claims unpackToken(String token) {

        byte[] signingKey;
        try {
            signingKey = getSigningKey();
            if (signingKey != null) {
                Claims claims = Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token).getBody();
                System.out.println("Claims:" + claims.values());
                return claims;
            }

        } catch (SignatureException ex) {
            Logger.getLogger(TokenValidator.class.getName()).log(Level.SEVERE, null, ex);

        }
        return null;
    }
    

    public String createToken(User user) throws IOException {

        Map<String, Object> claims = new HashMap<>();
        System.out.println("create token using " + user.getId() + "," + user.getType().name());
        claims.put("Type", user.getType().name());
        claims.put("Id", user.getId());    

        String token = Jwts.builder().setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, getSigningKey())
                .compact();
        return token;
    }
    

    private byte[] getSigningKey() {
        System.out.println("get Signing Key()");
        Properties props = new Properties();

        try (FileInputStream in = new FileInputStream(propFile)) {
            props.load(in);
        } catch (IOException ex) {
            Logger.getLogger(TokenValidator.class.getName()).log(Level.SEVERE, null, ex);
        }
       
        byte[] signingKey = props.getProperty("key").getBytes(StandardCharsets.ISO_8859_1);
        if (signingKey.length > 0) {
            return signingKey;
        }
        return null;
    }
    

    private byte[] createSigningKey() {
        SecretKey key = MacProvider.generateKey();
        byte[] signingKey = key.getEncoded();
        Properties props = new Properties();

        try (FileOutputStream out = new FileOutputStream(propFile)) {

            props.setProperty("key", new String(signingKey,StandardCharsets.ISO_8859_1.name()));
            props.store(out, null);
            
        } catch (IOException ex) {
            Logger.getLogger(TokenValidator.class.getName()).log(Level.SEVERE, " - failed to write properties file - ", ex);
        }

        return signingKey;
    }



}
