/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsvier.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author HP
 */
@Entity
@Table(name = "orders")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Sale.findAll", query = "SELECT s FROM Sale s")
    , @NamedQuery(name = "Sale.findById", query = "SELECT s FROM Sale s WHERE s.id = :id")
    , @NamedQuery(name = "Sale.findByCity", query = "SELECT s FROM Sale s WHERE s.city = :city")
    , @NamedQuery(name = "Sale.findByFamilyName", query = "SELECT s FROM Sale s WHERE s.familyName = :familyName")
    , @NamedQuery(name = "Sale.findByFirstName", query = "SELECT s FROM Sale s WHERE s.firstName = :firstName")
    , @NamedQuery(name = "Sale.findByInsertion", query = "SELECT s FROM Sale s WHERE s.insertion = :insertion")
    , @NamedQuery(name = "Sale.findByNumAddition", query = "SELECT s FROM Sale s WHERE s.numAddition = :numAddition")
    , @NamedQuery(name = "Sale.findByNumber", query = "SELECT s FROM Sale s WHERE s.number = :number")
    , @NamedQuery(name = "Sale.findByStreet", query = "SELECT s FROM Sale s WHERE s.street = :street")
    , @NamedQuery(name = "Sale.findByTotalPrice", query = "SELECT s FROM Sale s WHERE s.totalPrice = :totalPrice")
    , @NamedQuery(name = "Sale.findByZipCode", query = "SELECT s FROM Sale s WHERE s.zipCode = :zipCode")})
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "city")
    private String city;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "family_name")
    private String familyName;
    @Size(max = 255)
    @Column(name = "first_name")
    private String firstName;
    @Size(max = 50)
    @Column(name = "insertion")
    private String insertion;
    @Size(max = 10)
    @Column(name = "num_addition")
    private String numAddition;
    @Column(name = "number")
    private Integer number;
    @Lob
    @Column(name = "order_date")
    private byte[] orderDate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "street")
    private String street;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "total_price")
    private BigDecimal totalPrice;
    @Size(max = 10)
    @Column(name = "zip_code")
    private String zipCode;
    @OneToMany(mappedBy = "orderId")
    private List<FinalSuborder> finalSuborderList;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne
    private User userId;

    public Sale() {
    }

    public Sale(Long id) {
        this.id = id;
    }

    public Sale(Long id, String city, String familyName, String street, BigDecimal totalPrice) {
        this.id = id;
        this.city = city;
        this.familyName = familyName;
        this.street = street;
        this.totalPrice = totalPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getInsertion() {
        return insertion;
    }

    public void setInsertion(String insertion) {
        this.insertion = insertion;
    }

    public String getNumAddition() {
        return numAddition;
    }

    public void setNumAddition(String numAddition) {
        this.numAddition = numAddition;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public byte[] getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(byte[] orderDate) {
        this.orderDate = orderDate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    @XmlTransient
    public List<FinalSuborder> getFinalSuborderList() {
        return finalSuborderList;
    }

    public void setFinalSuborderList(List<FinalSuborder> finalSuborderList) {
        this.finalSuborderList = finalSuborderList;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
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
        if (!(object instanceof Sale)) {
            return false;
        }
        Sale other = (Sale) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "rsvier.entity.Sale[ id=" + id + " ]";
    }
    
}
