/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author HP
 */
@Entity
@Table(name = "cart_suborders")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CartSuborder.findAll", query = "SELECT c FROM CartSuborder c")
    , @NamedQuery(name = "CartSuborder.findById", query = "SELECT c FROM CartSuborder c WHERE c.id = :id")
    , @NamedQuery(name = "CartSuborder.findByQuantity", query = "SELECT c FROM CartSuborder c WHERE c.quantity = :quantity")
    , @NamedQuery(name = "CartSuborder.findBySubTotal", query = "SELECT c FROM CartSuborder c WHERE c.subTotal = :subTotal")})
public class CartSuborder implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private int quantity;
    
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "sub_total")
    private BigDecimal subTotal;
    
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    @ManyToOne
    private Cart cartId;
        
    @JoinColumn(name = "products_id")
    @OneToOne (cascade=CascadeType.ALL)
    private Product productId;

    public CartSuborder() {
    }

    public CartSuborder(Long id) {
        this.id = id;
    }

    public CartSuborder(Long id, int quantity, BigDecimal subTotal) {
        this.id = id;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public Cart getCartId() {
        return cartId;
    }

    public void setCartId(Cart cartId) {
        this.cartId = cartId;
    }

    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CartSuborder)) {
            return false;
        }
        CartSuborder other = (CartSuborder) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "rsvier.entity.CartSuborder[ id=" + id + " ]";
    }
  
}
