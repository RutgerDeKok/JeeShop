package rsvier.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author HP
 */
@XmlRootElement
public class EnumWrap implements Serializable { 
    
    private String name;
    private String readableName;
    
    public EnumWrap(){
    }

    
    public EnumWrap(String name, String readableName){
        this.name = name;
        this.readableName = readableName;
    }

    public String getName(){
        return name;
    }
    
    public String getReadableName(){
        return readableName;
    }
    
    public void setName(String name){
        this.name = name;
    }
    
     public void setReadableName(String readableName){
        this.readableName = readableName;
    }
    
    
    
}
