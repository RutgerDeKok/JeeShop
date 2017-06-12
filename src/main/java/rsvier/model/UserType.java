package rsvier.model;


public enum UserType {
    
EMPLOYEE("Medewerker","Mw"),
	CUSTOMER("Klant", "Kl"),
	ADMIN("Admin", "Adm"),
	ALL("Alles","All");

	private final String naamNL;
	private final String kortNL;

	private UserType(String naamNL, String kortNL) {
		this.naamNL = naamNL;
		this.kortNL = kortNL;
	}

	public String getNaamNed() {
		return naamNL;
	}

	public String getKortNed() {
		return kortNL;
	}



}
