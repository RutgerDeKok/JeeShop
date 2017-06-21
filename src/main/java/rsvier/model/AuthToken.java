/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.model;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.security.Key;
import javax.ejb.Singleton;
/**
 *
 * @author J
 */
@Singleton
public class AuthToken {
    
    Key key;
    String jwtString;
    User user;

    public AuthToken() {
        
    }
    
    public String createToken() {
        key = MacProvider.generateKey();
        jwtString = Jwts.builder().setSubject(user.getEmail()).signWith(SignatureAlgorithm.HS512, key).compact();
        return jwtString;
    }
    
    public boolean verifyToken(String jwtToken, String userEmail) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(jwtToken).getBody().getSubject().equals(userEmail); 
        //Will throw `SignatureException` if signature validation fails.
    }
    
    
    
}
