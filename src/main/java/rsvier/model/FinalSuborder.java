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
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author HP
 */
@Entity
@Table(name = "final_suborders")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "FinalSuborder.findAll", query = "SELECT f FROM FinalSuborder f")
    , @NamedQuery(name = "FinalSuborder.findById", query = "SELECT f FROM FinalSuborder f WHERE f.id = :id")
    , @NamedQuery(name = "FinalSuborder.findByItemPrice", query = "SELECT f FROM FinalSuborder f WHERE f.itemPrice = :itemPrice")
    , @NamedQuery(name = "FinalSuborder.findByPrdBrand", query = "SELECT f FROM FinalSuborder f WHERE f.prdBrand = :prdBrand")
    , @NamedQuery(name = "FinalSuborder.findByPrdCategory", query = "SELECT f FROM FinalSuborder f WHERE f.prdCategory = :prdCategory")
    , @NamedQuery(name = "FinalSuborder.findByPrdName", query = "SELECT f FROM FinalSuborder f WHERE f.prdName = :prdName")
    , @NamedQuery(name = "FinalSuborder.findByQuantity", query = "SELECT f FROM FinalSuborder f WHERE f.quantity = :quantity")
    , @NamedQuery(name = "FinalSuborder.findBySubTotal", query = "SELECT f FROM FinalSuborder f WHERE f.subTotal = :subTotal")})
public class FinalSuborder implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "item_price")
    private BigDecimal itemPrice;
    
    @Size(max = 50)
    @Column(name = "prd_brand")
    private String prdBrand;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "prd_category")
    private String prdCategory;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "prd_name")
    private String prdName;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private int quantity;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "sub_total")
    private BigDecimal subTotal;
    
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Sale order;

    public FinalSuborder() {
    }

    public FinalSuborder(Long id) {
        this.id = id;
    }

    public FinalSuborder(Long id, String prdCategory, String prdName, int quantity, BigDecimal subTotal) {
        this.id = id;
        this.prdCategory = prdCategory;
        this.prdName = prdName;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getPrdBrand() {
        return prdBrand;
    }

    public void setPrdBrand(String prdBrand) {
        this.prdBrand = prdBrand;
    }

    public String getPrdCategory() {
        return prdCategory;
    }

    public void setPrdCategory(String prdCategory) {
        this.prdCategory = prdCategory;
    }

    public String getPrdName() {
        return prdName;
    }

    public void setPrdName(String prdName) {
        this.prdName = prdName;
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

    public Sale getOrder() {
        return order;
    }

    public void setOrder(Sale order) {
        this.order = order;
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
        if (!(object instanceof FinalSuborder)) {
            return false;
        }
        FinalSuborder other = (FinalSuborder) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "rsvier.entity.FinalSuborder[ id=" + id + " ]";
    }
    
}
