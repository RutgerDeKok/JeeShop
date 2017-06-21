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
/**
 *
 * @author J
 */
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
    
    public boolean verifyToken(User user) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(user.getJwt()).getBody().getSubject().equals(user.getEmail()); 
        //Will throw `SignatureException` if signature validation fails.
    }
    
    
    
}
