/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.security;

import java.util.Iterator;
import java.util.Map;

/**
 *
 * @author HP
 */
public class MapToJson {

    public static String mapToJson(Map<String, String> map) {
        StringBuilder jsonString = new StringBuilder("{");
        //{ "name":"John", "age":31, "city":"New York" }; json format

        Iterator it = map.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            jsonString.append("\"").append(pair.getKey()).append("\":\"").append(pair.getValue()).append("\",");
            it.remove(); // avoids a ConcurrentModificationException
        }
        jsonString.setLength(jsonString.length() - 1);
        jsonString.append("}");
        return jsonString.toString();
    }

}
