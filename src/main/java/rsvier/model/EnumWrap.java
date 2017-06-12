package rsvier.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class EnumWrap implements Serializable { 
    
    private String name;
    private String readableName;
    private String shortName;
    
    public EnumWrap(){
    }

    
    public EnumWrap(String name, String readableName){
        this.name = name;
        this.readableName = readableName;
    }
    
     public EnumWrap(String name, String readableName, String shortName){
        this.name = name;
        this.readableName = readableName;
        this.shortName = shortName;
    }

    public String getName(){
        return name;
    }
    
    public String getReadableName(){
        return readableName;
    }
    
    public String getShortName(){
        return shortName;
    }
    
    public void setName(String name){
        this.name = name;
    }
    
     public void setReadableName(String readableName){
        this.readableName = readableName;
    }
    
     public void setShortName(String shortName){
        this.shortName = shortName;
    }
    
    
}
