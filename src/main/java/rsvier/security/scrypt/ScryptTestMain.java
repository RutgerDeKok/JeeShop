/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.security.scrypt;

/**
 *
 * @author HP
 */
public class ScryptTestMain {
    public static void main(String[] args){
        
        int n, r, p;
        n= 16384; r=8; p=1;
        String password = "RutgerRules";
        System.out.println("pw: "+password);
        for(int i = 0;i<10;i++){
            String hash = SCryptUtil.scrypt(password, n, r, p);
        System.out.println("hash: "+hash);
        }
        
        String hash2 = "$s0$e0801$nnVsFGykxEDwtcBUYVijrQ==$T5UuBIaT2f/gBVLyMQ2PlkwWVT6zF+bJB8wc5j0xQC8=";
        String hash3 = "$s0$e0801$nnVsFGykxEDwtcBUYVijrQ==$T5UuBIaT2f/gBVLyMQ2PlkwWVT6zF+bJB8wc5j0xQC7=";
        boolean pwCorrect = SCryptUtil.check(password, hash2);
        boolean pwBad = SCryptUtil.check(password, hash3);
        System.out.println("checking password with good hash: "+pwCorrect);
        System.out.println("checking password with bad hash: "+pwBad);
        
    }
}
